<script setup lang="js">
import Konva from 'konva';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import seat_d from '../assets/seatPath.js';
import getHallLayoutData from '../services/getHallLayoutData.js';
import stagePath from '../assets/stagePath.js';
import BackButton from '../components/BackButton.vue';

const route = useRoute()
let initOverflowSetting
let showId

// page flag, true for layout page, false for comments page
let isLayoutPage = ref(true)

onMounted(() => {
  blockScroll()

  showId = route.params.id
  console.log('Show ID:', showId)

  renderSeatCanvas(getHallLayoutData(showId))
})

onBeforeUnmount(() => {
  allowScroll()
})

// tab bar switch page
function switchPage(e) {
  console.log('switch page', e.target.id)
  isLayoutPage.value = !isLayoutPage.value

  console.log('isLayoutPage', isLayoutPage)
}

// Main render function
function renderSeatCanvas(hallLayoutData) {
  // create stage for all items
  const stageData = {
    container: 'seatCanvasContainer',
    width: window.innerWidth,
    height: window.innerHeight,
    draggable: true
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
  stage.add(seatsLayer);
}

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
    console.log('clicked on seat', e.target);
    alert(`Seat ID: ${e.currentTarget.attrs.seatId}`)
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

function blockScroll() {
  initOverflowSetting = window.document.body.style.overflow
  document.body.style.overflow = 'hidden';
}

function allowScroll() {
  document.body.style.overflow = initOverflowSetting;
}
</script>

<template>
  <!-- Control bar -->
  <BackButton class="backBtn" />
  <div class="tabBar" @click="switchPage" id="tabBar">
    <div class="tabBarStatusBar" id="tabStatusBar" :style="{ left: isLayoutPage ? 0 : '129px' }">
    </div>
    <div class="tabBarSeatText" id="tabSeat" :style="{ color: isLayoutPage ? 'white' : '#6E6E6E' }">SEAT</div>
    <div class="tabBarShowText" id="tabShow" :style="{ color: isLayoutPage ? '#6E6E6E' : 'white' }">SHOW</div>
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
  top: 57px;
  left: 39px;
  z-index: 2;
}

.tabBar {
  position: fixed;
  top: 20px;
  right: 20px;
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
}

.tabBarShowText {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 48px;
  font-size: 14px;
  font-weight: 700;
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
</style>