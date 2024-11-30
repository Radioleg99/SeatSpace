<script setup lang="js">
import Konva from 'konva';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import seat_d from '../assets/seatPath.js';
import getHallLayoutData from '../services/getHallLayoutData.js';
import stagePath from '../assets/stagePath.js';
import BackButton from '../components/BackButton.vue';
import RatingStars from '../components/RatingStars.vue';
import getSeatComments from '../services/getSeatComments.js';
import router from '../router/index.js';
import axiosInstance from '../services/axios.js';
import getShowComments from '../services/getShowComments.js';
import getShowBasicInfo from '../services/getShowBasicInfo.js';
import Swal from 'sweetalert2';

const route = useRoute()

// params for tab bar
const isLayoutPage = ref(true)

// params for seat's comments
const commentsList = ref([])
const isCommentPop = ref(false)
let currentChosedSeatId = 0

// params for show page
const showBasicData = ref({})
const showComments = ref([])
const page = ref(1)
const isLoading = ref(false)
const isEnd = ref(false)
const containerRef = ref(null)
const MIN_LOADING_TIME = 2000;

const loadshowCommentsList = async () => {
	if (isLoading.value || isEnd.value) return
	isLoading.value = true
	const showId = route.params.id
	// 创建一个最小加载时间的 Promise
	const minLoadingPromise = new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME))
	try {
		// 发送网络请求获取演出列表
		const response = await axiosInstance.get(`show/comment/${showId}`, {
			params: {
				page: page.value,
			},
		})
		const newShowComments = response.data || []
		if (newShowComments.length > 0) {
			showComments.value = [...showComments.value, ...newShowComments]
			page.value++
		} else {
			isEnd.value = true
		}
	} catch (error) {
		console.error('Error fetching comments:', error)
	} finally {
		// 等待最小加载时间的 Promise 完成
		await minLoadingPromise
		isLoading.value = false
	}
}

const handleScroll = () => {
	const container = containerRef.value
	if (!container || isLoading.value || isEnd.value) return
	if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
		loadshowCommentsList()
	}
}



onMounted(async () => {
  console.log('Show ID:', route.params.id)

  Swal.fire({
    title: 'Downloading Data...',
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: () => {
      Swal.showLoading()
    }
  })

  getHallLayoutData(route.params.id).then(seatLayoutData => {
    renderSeatCanvas(seatLayoutData)
    Swal.close()
  }).catch(err => {
    console.log(err)
    Swal.close()
  })

  getShowBasicInfo(route.params.id).then((res) => {
    showBasicData.value = res
  })

//   getShowComments(route.params.id).then((res) => {
//     showComments.value = res
//   })

  loadshowCommentsList()
})

// tab bar switch page
function switchPage(e) {
  const doSwitch = () => {
    isLayoutPage.value = !isLayoutPage.value
    isCommentPop.value = false
  }

  const targetId = e.target.id
  if (targetId === 'tabBar') {
    doSwitch()
  } else if (targetId === 'tabSeat' && !isLayoutPage.value) {
    doSwitch()
  } else if (targetId === 'tabShow' && isLayoutPage.value) {
    doSwitch()
  }
}

function closeCommentPop() {
  isCommentPop.value = false
  commentsList.value = []
}

function jumpToCommentPage() {
  router.push(`/comment/${route.params.id}/${currentChosedSeatId}`)
}

// canvas render function set, multiple funcitons are included
function renderSeatCanvas(hallLayoutData) {
  // create stage for all items
  const stageData = {
    container: 'seatCanvasContainer',
    width: window.innerWidth,
    height: window.innerHeight,
    draggable: true,
  }
  const stage = new Konva.Stage(stageData);

  // create layer for seats
  const seatsLayerData = {
    x: 0,
    y: 100,
    offsetX: -window.innerWidth / 2,
  }
  const seatsLayer = new Konva.Layer(seatsLayerData);

  // create stage shape
  const stageShape = createStageShape()

  // create seats layout
  const seatGroup = new Konva.Group({
    x: 0,
    y: 100,
  });

  hallLayoutData.forEach((zone, index) => {
    const zoneGroup = createZone(zone)
    zone.seats.forEach((seatData) => {
      const seat = createSeat(seatData)
      zoneGroup.add(seat)
    })
    seatGroup.add(zoneGroup)
  })

  seatsLayer.add(seatGroup)
  seatsLayer.add(stageShape)
  stage.add(seatsLayer)

  addPinchZoom(stage)

  function createStageShape() {
    // crate stage background
    const stage = new Konva.Path({
      x: 0,
      y: 0,
      data: stagePath,
      // fill: 'red',
      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: 0, y: 71 },
      fillLinearGradientColorStops: [0, 'rgba(47, 47, 66, 1)', 1, 'rgba(26, 26, 36 ,0.2)'],
    });
    const stageWidth = stage.getClientRect().width
    const stageHeight = stage.getClientRect().height

    // create stage text
    const stageText = new Konva.Text({
      x: 140,
      y: 20,
      text: 'stage',
      fontSize: 20,
      fill: '#6E6E6E',
    });
    const stageTextWidth = stageText.width()
    const stageTextHeight = stageText.height()

    // set stage text to center
    stageText.x(stageWidth / 2 - stageTextWidth / 2);
    stageText.y(stageHeight / 2 - stageTextHeight / 2);

    // create stage group
    const stageGroup = new Konva.Group({
      x: -stageWidth / 2, // center stage
      y: 0
    });

    stageGroup.add(stage);
    stageGroup.add(stageText);

    return stageGroup;
  }

  function createSeat(seatData) {
    // magic number, stand for seat width and height
    const seatWidth = 50
    const seatHeight = 50

    // seat properties
    const seatId = seatData[0]
    const seatColor = calculateSeatColor(seatData[1])
    const seatRow = seatData[2]
    const seatCol = seatData[3]

    const seatGroup = new Konva.Group({
      x: (seatCol - 1) * seatHeight,
      y: (seatRow - 1) * seatWidth,
      seatId: seatId,
    });

    // create seat
    const seat = new Konva.Path({
      x: 0,
      y: 0,
      data: seat_d, // seat icon svg path data
      fill: seatColor,
    });

    // create seat number text
    const seatNumber = new Konva.Text({
      x: 0,
      y: seatHeight - 20,
      text: seatCol,
      fontSize: 10,
      fill: 'balck',
    });
    seatNumber.x(seatWidth / 2 - seatNumber.width() / 2)

    // add seat and seat number to group
    seatGroup.add(seat)
    seatGroup.add(seatNumber)

    // add click event to seat
    seatGroup.on('click tap', async (e) => {
      const currentSeatId = e.currentTarget.attrs.seatId
	  const page = 2;
      console.log('clicked on seat', currentSeatId);
      isCommentPop.value = true
      Swal.fire({
        title: 'Loading Data...',
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading()
        }
      })
	//   const loadComments = async (page) => {
    //   try {
	// 		  const res = await getSeatComments(currentSeatId, page);
	// 		  if (page === 1) {
	// 			  // 第一次加载，直接替换
	// 			  commentsList.value = res;
	// 		  } else {
	// 			  // 后续分页加载，追加数据
	// 			  commentsList.value = [...commentsList.value, ...res];
	// 		  }
	// 		  Swal.close();
	// 	  } catch (err) {
	// 		  console.log(err);
	// 		  Swal.close();
	// 	  }
    // };
    // await loadComments(page);
    // const container = containerRef.value; // 假设评论有一个容器
    // if (container) {
    //   container.addEventListener('scroll', async () => {
    //     if (
    //       container.scrollHeight - container.scrollTop <=
    //       container.clientHeight + 10 // 距离底部 10px
    //     ) {
    //       page += 1; // 增加页码
    //       await loadComments(page); // 加载新数据
    //     }
    //   });
    // }
      getSeatComments(currentSeatId,page).then(res => {
		console.log(page);
        commentsList.value = res
        Swal.close()
      }).catch(err => {
        console.log(err)
        Swal.close()
      })
      currentChosedSeatId = currentSeatId
    });
    return seatGroup;
  }

  function calculateSeatColor(rating) {
    if (rating <= 0) {
      return 'grey'
    }
    else if (rating > 0 && rating < 1) {
      return 'red'
    } else if (rating >= 1 && rating < 3) {
      return 'yellow'
    } else if (rating >= 3 && rating <= 5) {
      return 'green'
    } else {
      return 'grey'
    }
  }

  function createZone(zoneData) {
    const group = new Konva.Group({
      x: zoneData.zoneOffsetX,
      y: zoneData.zoneOffsetY,
      rotation: zoneData.rotation,
      zoneId: zoneData.zoneId,
    });

    return group;
  }

  // pinch to zoom function
  function addPinchZoom(stage) {

    let lastDist = 0;
    let lastCenter = { x: 0, y: 0 };
    let isPinching = false;

    stage.on('touchstart', (e) => {
      if (e.evt.touches.length !== 2) return;

      e.evt.preventDefault();
      stage.setDraggable(false);

      isPinching = true;
      const touch1 = e.evt.touches[0];
      const touch2 = e.evt.touches[1];
      lastDist = getDistance(touch1, touch2);
      lastCenter = getCenter(touch1, touch2);
    });

    stage.on('touchmove', (e) => {
      if (!isPinching) return;
      if (e.evt.touches.length !== 2) return;

      e.evt.preventDefault();
      const touch1 = e.evt.touches[0];
      const touch2 = e.evt.touches[1];
      const dist = getDistance(touch1, touch2);
      const scale = dist / lastDist;

      // get the current scale
      const oldScale = stage.scaleX();
      const newScale = oldScale * scale;

      // set the new scale limit
      if (newScale < 0.2 || newScale > 3) return;

      stage.scale({ x: newScale, y: newScale });

      // set the new position
      const mousePointTo = {
        x: (lastCenter.x - stage.x()) / oldScale,
        y: (lastCenter.y - stage.y()) / oldScale,
      };

      const newPos = {
        x: lastCenter.x - mousePointTo.x * newScale,
        y: lastCenter.y - mousePointTo.y * newScale,
      };
      stage.position(newPos);

      stage.batchDraw();

      lastDist = dist;
      lastCenter = getCenter(touch1, touch2);
    });

    stage.on('touchend', (e) => {
      if (e.evt.touches.length < 2) {
        isPinching = false;
        stage.setDraggable(true);
      }
    });

    // get distance between two points
    function getDistance(t1, t2) {
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    // get center of two points
    function getCenter(t1, t2) {
      return {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };
    }
  }
}
</script>

<template>
	<!-- Control -->
	<BackButton class="backBtn" />
	<div class="tabBar" @click="switchPage" id="tabBar">
		<div class="tabBarStatusBar" id="tabStatusBar" :style="{ left: isLayoutPage ? 0 : '124px' }"></div>
		<div class="tabBarSeatText" id="tabSeat" :style="{ color: isLayoutPage ? 'white' : '#6E6E6E' }">SEAT</div>
		<div class="tabBarShowText" id="tabShow" :style="{ color: isLayoutPage ? '#6E6E6E' : 'white' }">SHOW</div>
	</div>

	<!-- Seat Comments pop up -->
	<div v-if="isCommentPop">
		<!-- mask -->
		<div class="darkMask"></div>

		<!-- close and add comment button -->
		<div class="btnContainer" style="left: calc(10% + 12px)" @click="closeCommentPop">
			<img src="../assets/close-btn.svg" alt="close" class="btnIcon" />
		</div>
		<div class="btnContainer" style="right: calc(10% + 12px)" @click="jumpToCommentPage">
			<img src="../assets/new-comment-btn.svg" class="btnIcon" />
		</div>

		<!-- comments container -->
		<div class="seatCommentPopContainer">
			<div class="singleCommentContainer" v-for="comment in commentsList">
				<RatingStars :rating="comment.rating" class="ratingStars" size="19.5" />
				<div class="imgMask"></div>
				<img :src="comment.imgUrl" alt="star" class="commentImg" />
			</div>

			<div v-if="commentsList.length === 0" style="display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; color: aliceblue">No comment found! Please add one!</div>
		</div>
	</div>

	<!-- Seat Layout -->
	<div v-show="isLayoutPage" id="seatCanvasContainer" class="layoutBg"></div>

	<!-- Show Detail -->
	<div v-show="!isLayoutPage" class="showBg">
		<!-- show basic info -->
		<div v-if="showBasicData" class="showBasicInfoContainer">
			<img :src="showBasicData.imgUrl" alt="showPoster" class="poster" />
			<div class="infoBox">
				<div class="showName">{{ showBasicData.showName }}</div>
				<div class="showTheater">
					<img src="../assets/map-pin.svg" />
					<span> {{ showBasicData.theater + ' ' + showBasicData.hall }}</span>
				</div>
				<div class="showTheater">
					<img src="../assets/clock.svg" />
					<span>
						{{ showBasicData.startTime }}
					</span>
				</div>
				<RatingStars :rating="showBasicData.rating" size="8.5" />
			</div>
		</div>

		<!-- show comments -->
		<div class="showCommentsChangeBox" ref="containerRef" @scroll="handleScroll">
			<div v-for="comment in showComments" class="commentBox">
				<div class="commentImgBox">
					<img v-for="img in comment.imgUrl" :src="img" alt="commentImg" class="commentImg" />
				</div>
				<div class="commentText">{{ comment.comment }}</div>
				<div class="commentStar">
					<RatingStars :rating="parseFloat(comment.rating)" size="10.5" />
					<div class="commentDate">{{ comment.date }}</div>
				</div>
			</div>
			<div v-if="isLoading && !isEnd" class="loading-indicator">
				<img src="../assets/icon/refresh.svg" alt="Loading..." class="rotating-icon" />
			</div>
			<div v-if="isEnd" class="end-indicator">No more results</div>
		</div>

		<!-- poster background -->
		<div
			v-if="showBasicData"
			class="showBgImg"
			:style="{
				background: `linear-gradient(180deg, rgba(0, 0, 0, 0.42) 24.5%, #505E2C 86.5%), url(${showBasicData.imgUrl}) lightgray 50% / cover no-repeat`,
			}"
		></div>
	</div>
</template>

<style scoped>
.layoutBg {
	background-color: #1a1a24;
	z-index: 1;
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.backBtn {
	position: fixed;
	top: 40px;
	left: 30px;
	z-index: 2;
}

.tabBar {
	position: fixed;
	top: 40px;
	right: 30px;
	width: 255px;
	height: 35px;
	background-color: #e9ebea;
	z-index: 2;
	border-radius: 50px;
}

.tabBarSeatText {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 48px;
	font-size: 14px;
	font-weight: 700;
	transition: all 0.3s;
}

.tabBarShowText {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 39px;
	font-size: 14px;
	font-weight: 700;
	transition: all 0.3s;
}

.tabBarStatusBar {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 132px;
	height: 36px;
	background-color: #6f00ff;
	border-radius: 50px;
	transition: all 0.3s;
}

.seatCommentPopContainer {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	height: 80%;
	z-index: 4;
	display: flex;
	flex-direction: column;
	gap: 16px;
	color: #1a1a24;
	padding: 8px;
	border-radius: 15px;
	border: 1px solid #4747bf;
	background: #2f2f42;
	box-shadow: 0px 0px 20px 0px #5b5bc6;
	overflow-x: hidden;
	overflow-y: scroll;
}

.darkMask {
	background: rgba(0, 0, 0, 0.65);
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 3;
	top: 0;
	left: 0;
}

.singleCommentContainer {
	height: 191px;
	position: relative;
}

.singleCommentContainer .commentImg {
	height: 191px;
	width: 100%;
	border-radius: 10px;
	/* position: absolute; */
}

.ratingStars {
	position: absolute;
	left: 9px;
	bottom: 11.5px;
	z-index: 4;
}

.imgMask {
	border-radius: 0px 0px 10px 10px;
	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1a1a24 100%);
	position: absolute;
	width: 100%;
	height: 38px;
	bottom: 0;
}

.btnContainer {
	position: fixed;
	bottom: calc(10% + 20px);
	z-index: 5;
	width: 70px;
	height: 70px;
	flex-shrink: 0;
	border-radius: 70px;
	background: var(--active, #4747bf);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	display: flex;
	justify-content: center;
	align-items: center;
}

.btnIcon {
	width: 24px;
	height: 24px;
	flex-shrink: 0;
}

.showBg {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: calc(100% - 60px);
	padding: 0 30px;
	background-color: #505e2c;
	z-index: 1;

	display: flex;
	flex-direction: column;
	gap: 14px;
	overflow-y: scroll;
}

.showBgImg {
	height: 237px;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
}

.showBasicInfoContainer {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 17px;
	margin-top: 100px;

	z-index: 2;
	color: #fff;
	font-family: Helvetica;
	font-size: 10px;
	font-style: normal;
	font-weight: 400;
	line-height: 10px;
}

.showBasicInfoContainer .poster {
	width: 120px;
	height: 160px;
	border-radius: 7px;
	object-fit: cover;
	flex-shrink: 0;
}

.showBasicInfoContainer .infoBox {
	flex: 1;
}

.showBasicInfoContainer .showName {
	color: #fff;
	text-align: left;
	font-family: Helvetica;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 27.879px;

	word-wrap: break-word;
	margin-bottom: 17px;
	flex: 1;
}

.showBasicInfoContainer .showTheater {
	display: flex;
	align-items: center;
	gap: 5px;
	margin-bottom: 7px;
}

.showBasicInfoContainer .infoBox:last-child {
	margin-bottom: 12.5px;
}

.showCommentsBox {
	position: fixed;
	top: 301px;
	left: 30px;
	z-index: 2;
	width: calc(100% - 60px);
	max-height: calc(100% - 301px);
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	gap: 14px;
}

.showCommentsChangeBox {
	display: flex;
	flex-direction: column;
	margin-top: 5px;
	gap: 22px;
	overflow-y: auto; /* Enable vertical scrolling */
	scrollbar-width: none;
}

.commentBox {
	border-radius: 20px;
	background: var(--main-Background-cold, #e9ebea);
	flex-shrink: 0;
	padding: 10px;
}

.commentImgBox {
	display: flex;
	gap: 10px;
	overflow-x: scroll;
	margin-bottom: 14px;
}

.commentImg {
	width: 118px;
	height: 118px;
	flex-shrink: 0;
	border-radius: 5px;
	object-fit: cover;
}

.commentText {
	color: #000;
	font-family: Helvetica;
	font-size: 10px;
	font-style: normal;
	font-weight: 400;
	line-height: 14px;
	margin-bottom: 14px;
}

.commentStar {
	display: flex;
	justify-content: space-between;
}

.commentDate {
	color: #000;
	text-align: right;
	font-family: Helvetica;
	font-size: 10px;
	font-style: normal;
	font-weight: 400;
	line-height: 10px;
}

.rotating-icon {
	width: 20px;
	/* 根据需要调整图标大小 */
	height: 20px;
	animation: rotate 1s linear infinite;
	margin-left: 50%;
}

.end-indicator {
	margin-top: 2px;
	color: white;
	font-size: 20px;
	margin-left: 50%;
}
</style>
<style>
@keyframes rotate {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>
