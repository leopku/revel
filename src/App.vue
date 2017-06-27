<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'

export default {
  name: 'app',
  components: {
    Navbar,
    Foot
  }
}
</script>

<style lang="scss">
html, body {
  color: #5e6d82;
  font-size: 12px;
}

.tag-icon {
  border-radius: 4px;
  width: 1.333em;
  height: 1.333em;
  display: inline-block;
  vertical-align: -3px;
  background-color: #e8ecf3;
}

.fg-white {
  color: #fff;
}

.fg-white--dark {
  color: #F9FAFC;
}

.fg-gray {
  color: #D3DCE6;
}

.fg-gray--extra {
  color: #EFF2F7;
}

.fg-silver--extra {
  color: #C0CCDA;
}

.fg-silver--light {
  color: #99A9BF;
}

.fg-silver {
  color: #8492A6;
}

.bg--white {
  background-color: #fff;
}

.bg--dark {
  background-color: #445d7d;
  // border-color: #445d7d;
}

.bg-gray--light {
  background-color: #E5E9F2;
}

.bg-gray--lighter {
  background-color: #F9FAFC;
}

.bg-gray--extra {
  background-color: #e8ecf3;
}

.bg--orange {
  background-color: rgb(254, 181, 77);
}

.bg--deepskyblue {
  background-color: rgb(103, 204, 234);
}

.bg--turquoise {
  background-color: rgb(146, 230, 217);
}

.bg--mediumturquoise {
  background-color: rgb(154, 206, 199);
}

.no-border {
  border-width: 0;
}

.full--width {
  width: 100%;
}

.text-emphasis--big {
  font-size: 2em; // 24px
}

.text-emphasis {
  font-size: 1.833em; // 22px
}

.text-emphasis--small {
  font-size: 1.667em; //20px
}

.text-regular--big {
  font-size: 1.5em; // 18px
}

.text-regular {
  font-size: 1.333em; // 16px
}

.text-regular--small {
  font-size: 1.167em; // 14px
}

.text-assist--big {
  font-size: 1em; // 12px
}

.text-assist {
  font-size: 0.83em; // 10px
}

.text-assist--small {
  font-size: 0.667em; // 8px
}

.float-right {
  float: right;
}

.flex {
  display: flex;
}

.flex-direction--column {
  flex-direction: column;
}

.flex-justify--center {
  justify-content: center
}

.flex-justify--start {
  justify-content: flex-start;
}

.flex-justify--end {
  justify-content: flex-end;
}

.flex-justify--between {
  justify-content: space-between;
}

.flex-justify--around {
  justify-content: space-around;
}

.flex-align--middle {
  align-items: center;
}

.flex-align--baseline {
  align-items: baseline;
}

@media screen and (max-width: 47.99em) {
  .el-col-xs-0 {
    display: none;
  }
}

@media screen and (min-width: 48em) and (max-width: 61.99em) {
  .el-col-sm-0 {
    display: none;
  }
}

@media screen and (min-width: 62em) and (max-width: 74.99em) {
  .el-col-md-0 {
    display: none;
  }
}

@media screen and (min-width: 75em) {
  .el-col-lg-0 {
    display: none;
  }
}

.typcn:before {
  font-size: 1.833em;
}

.transition-width {
  transition: width 10s ease-out;
  -webkit-transition: width 10s ease-out;
}
</style>
