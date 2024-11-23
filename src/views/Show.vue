<script setup lang="js">
import Konva from 'konva';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import seat_d from '../assets/seatPath.js';
import getHallLayoutData from '../services/getHallLayoutData.js';
import stagePath from '../assets/stagePath.js';
import BackButton from '../components/BackButton.vue';
import RatingStars from '../components/RatingStars.vue';
import getSeatComments from '../services/getSeatComments.js';
import router from '../router/index.js';

const route = useRoute()

// params for canvas
let initOverflowSetting
const isLayoutPage = ref(true)  // page flag, true for layout page, false for comments page

// params for seat's comments
const commentsList = ref([])
const isCommentPop = ref(false)
const currentChosedSeatId = ref(0)

onMounted(() => {
  console.log('Show ID:', route.params.id)
  blockScroll()
  renderSeatCanvas(getHallLayoutData(route.params.id))
})

onBeforeUnmount(() => {
  allowScroll()
})

// tab bar switch page
function switchPage(e) {
  console.log('switch page: ', e.target.id, "isLayoutPage: ", isLayoutPage.value)
  const doSwitch = () => isLayoutPage.value = !isLayoutPage.value

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
  router.push('/comment/' + currentChosedSeatId.value)
}

// canvas render function
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
    const seatWidth = 33
    const seatHeight = 33

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
      y: seatHeight - 13,
      text: seatCol,
      fontSize: 10,
      fill: 'balck',
    });
    seatNumber.x(seatWidth / 2 - seatNumber.width() / 2)

    // add seat and seat number to group
    seatGroup.add(seat)
    seatGroup.add(seatNumber)

    // add click event to seat
    seatGroup.on('click tap', function (e) {
      console.log('clicked on seat', e.currentTarget.attrs.seatId);
      isCommentPop.value = true
      commentsList.value = getSeatComments(e.currentTarget.attrs.seatId)
      currentChosedSeatId.value = e.currentTarget.attrs.seatId
    });

    return seatGroup;
  }

  function calculateSeatColor(rating) {
    if (rating < 0) {
      return 'grey'
    }
    else if (rating >= 0 && rating < 1) {
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
      // const touchLength = e.evt.touches.length
      // console.log('touchstart:', touchLength);

      if (e.evt.touches.length !== 2) return;

      e.evt.preventDefault();
      console.log('set undraggable')
      stage.setDraggable(false);

      isPinching = true;
      const touch1 = e.evt.touches[0];
      const touch2 = e.evt.touches[1];
      lastDist = getDistance(touch1, touch2);
      lastCenter = getCenter(touch1, touch2);
    });

    stage.on('touchmove', (e) => {
      // const touchLength = e.evt.touches.length
      // console.log('touchsmove:', touchLength);

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
      if (newScale < 0.5 || newScale > 3) return;

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
      // const touchLength = e.evt.touches.length
      // console.log('touchend:', touchLength);

      if (e.evt.touches.length < 2) {
        isPinching = false;

        console.log('set draggable')
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

function blockScroll() {
  initOverflowSetting = window.document.body.style.overflow
  document.body.style.overflow = 'hidden';
}

function allowScroll() {
  document.body.style.overflow = initOverflowSetting;
}
</script>

<template>
  <!-- Control -->
  <BackButton class="backBtn" />
  <div class="tabBar" @click="switchPage" id="tabBar">
    <div class="tabBarStatusBar" id="tabStatusBar" :style="{ left: isLayoutPage ? 0 : '129px' }">
    </div>
    <div class="tabBarSeatText" id="tabSeat" :style="{ color: isLayoutPage ? 'white' : '#6E6E6E' }">SEAT</div>
    <div class="tabBarShowText" id="tabShow" :style="{ color: isLayoutPage ? '#6E6E6E' : 'white' }">SHOW</div>
  </div>

  <!-- Seat Comments pop up -->
  <div v-if="isCommentPop">
    <!-- mask -->
    <div class="darkMask"></div>

    <!-- close and add comment button -->
    <div class="btnContainer" style="left: calc(10% + 12px);" @click="closeCommentPop">
      <img src="../assets/close-btn.svg" alt="close" class="btnIcon" />
    </div>
    <div class="btnContainer" style="right: calc(10% + 12px);" @click="jumpToCommentPage">
      <img src="../assets/new-comment-btn.svg" class="btnIcon" />
    </div>

    <!-- comments container -->
    <div class="seatCommentPopContainer">
      <div class="singleCommentContainer" v-for="comment in commentsList">
        <RatingStars :rating="comment.rating" class="ratingStars" size="19.5" />
        <div class="imgMask"></div>
        <img :src="comment.imgUrl" alt="star" class="commentImg" />
      </div>
    </div>
  </div>

  <!-- Seat Layout -->
  <div v-show="isLayoutPage" id="seatCanvasContainer" class="bg"></div>
  <!-- Show Detail -->
  <div v-show="!isLayoutPage">comment</div>
</template>

<style scoped>
.bg {
  background-color: #1A1A24;
  z-index: 1;
}

.backBtn {
  position: fixed;
  top: 40px;
  left: 39px;
  z-index: 2;
}

.tabBar {
  position: fixed;
  top: 40px;
  right: 39px;
  width: 255px;
  height: 35px;
  background-color: #E9EBEA;
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
  right: 36px;
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
  background-color: #6F00FF;
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
  color: #1A1A24;
  padding: 8px;
  border-radius: 15px;
  border: 1px solid #4747BF;
  background: #2F2F42;
  box-shadow: 0px 0px 20px 0px #5B5BC6;
  overflow-x: hidden;
  overflow-y: scroll;
}

.darkMask {
  background: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 3;
}

.singleCommentContainer {
  height: 191px;
  position: relative;
}

.commentImg {
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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #1A1A24 100%);
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
  background: var(--active, #4747BF);
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
</style>