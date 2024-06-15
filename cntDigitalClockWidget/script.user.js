// ==UserScript==
// @name         Digital Clock Widget by Chua Nghi Ten
// @namespace    http://tampermonkey.net/
// @version      2024.06.15.20.14
// @license      GNU GPLv3
// @description  Provide a seemingly useless clock in the corner of the screen.
// @author       Chua Nghi Ten
// @match        *://*/*
// @icon         https://github.com/chuanghiten/chuanghiten.github.io/raw/main/favicon.ico
// @updateURL    https://github.com/chuanghiten/CNT-User-Script/raw/main/cntDigitalClockWidget/script.user.js
// @downloadURL  https://github.com/chuanghiten/CNT-User-Script/raw/main/cntDigitalClockWidget/script.user.js
// @grant        none
// ==/UserScript==

(() => {
  "use strict";
  window.addEventListener("load", () => {
    window.document
      .querySelector("html body")
      .insertAdjacentHTML(
        "beforeend",
        '<div class="Chua Nghi Ten Digital Clock Widget"><div class="cntClock" cntleft cntright><div class="cntSecondsProgress"><svg><path stroke-linecap="round" stroke-linejoin="round"></path><path stroke-linecap="round" stroke-linejoin="round"></path></svg></div><span class="cntleftButtonMenu cntButtonMenu"><span title="Open or Close settings" class="cntCursorPointer">•••</span> | </span><span class="cntClockText"><span class="cntHours">88</span>:<span class="cntMinutes">88</span><span class="cntSeconds">:88</span><span class="cntAmPm"></span></span><span class="cntrightButtonMenu cntButtonMenu"> | <span title="Open or Close settings" class="cntCursorPointer">•••</span></span></div><div class="cntNotiStatus"></div><div class="cntMenu"><ul><li class="cntMoveButton cntCursorPointer" title="Move to...">Move</li><li class="cntSecondsDropdown"><span><span>Seconds settings</span><span title="Expand / Collapse" class="cntCursorPointer">•••</span></span><ul><li><span><span>Show seconds</span><span class="cntShowSecondsSwitch cntSwitch" title="Disable / Enable"></span></span></li><li><span><span>Alternating seconds progress bar</span><span class="alternatingSecondsSwitch cntSwitch" title="Disable / Enable"></span></span><ul><li class="secondsProgressStyle"><span><span>Seconds progress bar style</span><span><span><input type="radio" id="paintGradually" name="secondsProgressStyle"><label for="paintGradually">Paint gradually</label></span><span><input type="radio" id="eraseGradually" name="secondsProgressStyle"><label for="eraseGradually">Erase gradually</label></span></span></span></li></ul></li><li><span><span>Progress bar seconds counterclockwise</span><span class="secondsProgressCountDown cntSwitch" title="Disable / Enable"></span></span></li><li><span><span>Smooth seconds progress bar</span><span class="cntSmoothSecondsSwitch cntSwitch" title="Disable / Enable"></span></span></li></ul></li><li class="cntShowAMPM"><span><span>12 - Hour time</span><span class="cntHour12Switch cntSwitch" title="Disable / Enable"></span></span><ul><li><span><span>Show AM / PM</span><span class="cntShowAMPMSwitch cntSwitch" title="Disable / Enable"></span></span></li></ul></li><li><span class="cntUpdate"><span>Auto check update</span><span class="cntAutoUpdateSwitch cntSwitch" title="Disable / Enable"></span></span><ul class="cntCheckForUpdate"><li><span><span class="cntCursorPointer">Check for Update</span><span><span>•</span><span>•</span><span>•</span></span></span></span></li></ul><ul class="cntUpdateSettings"><li><span><span>Check for updates every time the page loads</span><span class="cntSwitch" title="Disable / Enable"></span></span></li><li><span><span>Check for updates every</span><select id="cntTimeUpdate" class="cntCursorPointer"><option>5 minutes</option><option>15 minutes</option><option>30 minutes</option><option>1 hour</option><option>2 hours</option></select></span></li></ul></li></ul></div><div class="cntBlockHover" title="Double click to set and exit"></div></div>'
      );
    window.document
      .querySelector("html body")
      .insertAdjacentHTML(
        "afterend",
        '<style>@keyframes scaleOut {0%, 12.5%, 50%, 62.5%, 100% {opacity: .25} 25%, 37.5%, 75%, 87.5% {opacity: 1}} html body .Chua.Nghi.Ten.Digital.Clock.Widget, html body .Chua.Nghi.Ten.Digital.Clock.Widget * {margin: 0; padding: 0; border: 0; box-sizing: border-box; position: relative; display: block; font-family: Roboto, Arial, sans-serif; font-size: 16px; line-height: 19px; user-select: none; white-space: nowrap} html body .Chua.Nghi.Ten.Digital.Clock.Widget span {display: inline} html body .Chua.Nghi.Ten.Digital.Clock.Widget a {color: #fff; text-decoration: none} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntCursorPointer, html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntSwitch {cursor: pointer} html body .Chua.Nghi.Ten.Digital.Clock.Widget {position: fixed; padding: 10px; z-index: 2147483647} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock {background: #000000b5; color: #fff; border-radius: 10px; padding: 6px 10px; box-shadow: 0 4px 10px #00000080; min-width: 20px; min-height: 20px; backdrop-filter: blur(30px)} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntButtonMenu {display: none} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cntright]:hover .cntleftButtonMenu {display: inline} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cntleft]:hover .cntrightButtonMenu {display: inline} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntSecondsProgress {position: absolute; top: 0; left: 0; width: 100%; height: 100%} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg {width: 100%; height: 100%} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path {fill: #0000; stroke-width: 2px; stroke: #fff} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path:first-child {stroke: #fff3} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu, html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus {position: absolute; background: #0009; border-radius: 10px; box-shadow: 0 4px 10px #00000080; backdrop-filter: blur(5px); border: 2px solid #fff; padding: 6px 10px; color: #fff; display: none} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu[active], html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus[active] {display: flex} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cntleft] + .cntNotiStatus + .cntMenu[active], html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cntleft] + .cntNotiStatus[active] {left: 10px} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cntright] + .cntNotiStatus + .cntMenu[active], html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cntright] + .cntNotiStatus[active] {right: 10px} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cntbottom] + .cntNotiStatus[active], html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cntbottom] + .cntNotiStatus + .cntMenu[active] {bottom: 100%} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cnttop] + .cntNotiStatus[active], html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cnttop] + .cntNotiStatus + .cntMenu[active] {top: 100%} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cntbottom] + .cntNotiStatus[active] + .cntMenu[active] {bottom: 200%} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock[cnttop] + .cntNotiStatus[active] + .cntMenu[active] {top: 200%} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li {border-bottom: 1px solid #fff4; padding-bottom: 5px; margin-bottom: 5px} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li:hover {background: #fff2} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li:last-child {border: 0; padding: 0; margin: 0} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntBlockHover {width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: none} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntBlockHover[active] {display: block; cursor: all-scroll} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText {white-space: nowrap} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul {margin: 4px 0 4px 20px; display: none} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul[active] {display: block} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li > span {display: flex; justify-content: space-between; align-items: center} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li > span > span + span {margin-left: 50px} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntSwitch, html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntSwitch {width: 35px; height: 20px; border: 2px solid #fff; border-radius: 10px; display: flex; justify-content: flex-start} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntSwitch[active], html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntSwitch[active] {justify-content: flex-end} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntSwitch:before, html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntSwitch:before {content: ""; display: block; position: relative; width: 12px; height: 12px; border-radius: 50%; background: #fff; margin: 2px} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li > span.cntUpdate + ul li span span + span span {display: none} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu[active] ul li > span.cntUpdate + ul[active] li span span + span[active] span {display: inline; animation: scaleOut 1.5s linear .1s infinite} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu[active] ul li > span.cntUpdate + ul[active] li span span + span[active] span:last-child {animation-delay: .2s} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu[active] ul li > span.cntUpdate + ul[active] li span span + span[active] span:first-child {animation-delay: 0s} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings select {background-color: #fff0; border: 1px solid #fff9; border-radius: 5px; color: #fff; outline: none; margin: 0 0 0 50px; padding: 3px 5px} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings select:focus-visible {border-color: #fff} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings select option {color: #333} html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li + li > span > span {display: flex; align-items: center} html body div.Chua.Nghi.Ten.Digital.Clock.Widget div.cntMenu li.secondsProgressStyle span span + span span {display: flex} html body div.Chua.Nghi.Ten.Digital.Clock.Widget div.cntMenu li.secondsProgressStyle span span + span span input {margin-right: 5px} html body div.Chua.Nghi.Ten.Digital.Clock.Widget div.cntMenu li.secondsProgressStyle span span + span span:first-child {margin-bottom: 5px} html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > span > span:nth-child(1) > input[type=text] {display: inline; background: #0000; outline: none; color: #fff; text-align: right; text-decoration: underline}</style>'
      );
    let cfr = 0,
      time = 0,
      seconds = 0,
      minutes = 0,
      hours = 0,
      oldSeconds,
      oldMinutes,
      oldHours,
      menuActive = false,
      widgetMove = false,
      secondsHided = false,
      smoothSeconds = true,
      hour12 = true,
      showAMPM = true,
      autoCheckUpdate = true,
      updateChecking = false,
      cntDelayMs = 0,
      cntDelayEnable = false,
      cntDelayCallBack = () => {},
      cntDelayFollowCallBack = () => {},
      updateEveryPageLoads = false,
      cntCheckUpdateAfter = 1,
      alternatingSeconds = true,
      paintGradually = true,
      secondsProgressCountDown = false;
    const cntTimeWidget = window.document.querySelector(
        "html body div.Chua.Nghi.Ten.Digital.Clock.Widget"
      ),
      currentVersion = "2024.06.15.20.14",
      windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      cntTimeOnWindowSize = {
        width: 1,
        height: 1,
      },
      updateSeconds = Object.freeze({
        size: (clockWidth, clockHeight) => {
          let w1 = clockWidth - 1,
            h10d5 = clockHeight - 9,
            h0d4 = clockHeight - 4.6,
            w0d4 = clockWidth - 4.6,
            h1 = clockHeight - 1,
            w10d5 = clockWidth - 9;
          window.document
            .querySelectorAll(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path"
            )
            .forEach((c) => {
              c.setAttribute(
                "d",
                `M 1 9 C 1 4.6 4.6 1 9 1 H ${w10d5} C ${
                  clockWidth - 4.6
                } 1 ${w1} 4.6 ${w1} 9 V ${h10d5} C ${w1} ${h0d4} ${w0d4} ${h1} ${w10d5} ${h1} H 9 C 4.6 ${h1} 1 ${h0d4} 1 ${h10d5} Z`
              );
            });
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg"
            )
            .setAttribute("width", clockWidth);
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg"
            )
            .setAttribute("height", clockHeight);
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg"
            )
            .setAttribute("viewbox", `0 0 ${clockWidth} ${clockHeight}`);
          window.document.querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
          ).style.strokeDasharray = `${window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
            )
            .getTotalLength()}px`;
        },
        seconds: (s, eo) => {
          if (alternatingSeconds) {
            if (secondsProgressCountDown)
              window.document.querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
              ).style.strokeDashoffset = `${
                ((eo % 2) + s) *
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                  )
                  .getTotalLength()
              }px`;
            else
              window.document.querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
              ).style.strokeDashoffset = `${
                ((eo % 2) - s) *
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                  )
                  .getTotalLength()
              }px`;
          } else {
            if (secondsProgressCountDown) {
              if (paintGradually)
                window.document.querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                ).style.strokeDashoffset = `${
                  (1 + s) *
                  window.document
                    .querySelector(
                      "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                    )
                    .getTotalLength()
                }px`;
              else
                window.document.querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                ).style.strokeDashoffset = `${
                  (2 + s) *
                  window.document
                    .querySelector(
                      "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                    )
                    .getTotalLength()
                }px`;
            } else {
              if (paintGradually)
                window.document.querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                ).style.strokeDashoffset = `${
                  (1 - s) *
                  window.document
                    .querySelector(
                      "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                    )
                    .getTotalLength()
                }px`;
              else
                window.document.querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                ).style.strokeDashoffset = `${
                  (2 - s) *
                  window.document
                    .querySelector(
                      "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntSecondsProgress svg path + path"
                    )
                    .getTotalLength()
                }px`;
            }
          }
        },
      }),
      getViTriWidget = (wWidth, wHeight) => {
        if (
          (cntTimeWidget.getBoundingClientRect().left +
            cntTimeWidget.getBoundingClientRect().width / 2) /
            wWidth <
          0.5
        ) {
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .removeAttribute("cntright");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .setAttribute("cntleft", "");
        } else {
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .removeAttribute("cntleft");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .setAttribute("cntright", "");
        }
        if (
          (cntTimeWidget.getBoundingClientRect().top +
            cntTimeWidget.getBoundingClientRect().height / 2) /
            wHeight <
          0.5
        ) {
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .removeAttribute("cntbottom");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .setAttribute("cnttop", "");
        } else {
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .removeAttribute("cnttop");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .setAttribute("cntbottom", "");
        }
      },
      fr = 10,
      cntDelay = () => {
        cntDelayFollowCallBack();
        if (cntDelayMs < Date.now()) {
          cntDelayCallBack();
          cntDelayEnable = false;
        }
      },
      updateTimeWithFPS = () => {
        time = new Date();
        if (cfr > fr) {
          cfr = 0;
          seconds = time.getSeconds();
          if (seconds != oldSeconds) {
            oldSeconds = seconds;
            minutes = time.getMinutes();
            if (minutes != oldMinutes) {
              oldMinutes = minutes;
              hours = time.getHours();
              if (hours != oldHours) {
                oldHours = hours;
                if (hour12) {
                  if (hours <= 12)
                    window.document.querySelector(
                      "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntHours"
                    ).innerHTML = hours;
                  else
                    window.document.querySelector(
                      "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntHours"
                    ).innerHTML = hours - 12;
                } else
                  window.document.querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntHours"
                  ).innerHTML = hours;
              }
              if (minutes < 10)
                window.document.querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntMinutes"
                ).innerHTML = `0${minutes}`;
              else
                window.document.querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntMinutes"
                ).innerHTML = minutes;
              if (showAMPM && hour12) {
                if (hours * 60 + minutes < 720)
                  window.document.querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntAmPm"
                  ).innerHTML = " AM";
                else
                  window.document.querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntAmPm"
                  ).innerHTML = " PM";
              }
            }
            if (!secondsHided) {
              if (seconds < 10)
                window.document.querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntSeconds"
                ).innerHTML = `:0${seconds}`;
              else
                window.document.querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntSeconds"
                ).innerHTML = `:${seconds}`;
            }
            if (!smoothSeconds) updateSeconds.seconds(seconds / 60, minutes);
            updateSeconds.size(
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
                )
                .getBoundingClientRect().width,
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
                )
                .getBoundingClientRect().height
            );
            if (autoCheckUpdate && seconds == 0)
              switch (cntCheckUpdateAfter) {
                case 0:
                  if (minutes % 5 == 0) {
                    updateChecking = true;
                    checkForUpdate();
                  }
                  break;
                case 1:
                  if (minutes % 15 == 0) {
                    updateChecking = true;
                    checkForUpdate();
                  }
                  break;
                case 2:
                  if (minutes % 30 == 0) {
                    updateChecking = true;
                    checkForUpdate();
                  }
                  break;
                case 3:
                  if (minutes % 60 == 0) {
                    updateChecking = true;
                    checkForUpdate();
                  }
                  break;
                case 4:
                  if ((minutes + hours * 60) % 120 == 0) {
                    updateChecking = true;
                    checkForUpdate();
                  }
                  break;
              }
          }
        } else ++cfr;
        if (smoothSeconds)
          updateSeconds.seconds(
            (time.getSeconds() + time.getMilliseconds() / 999) / 60,
            time.getMinutes()
          );
        if (cntDelayEnable) cntDelay();
        window.requestAnimationFrame(updateTimeWithFPS);
      },
      cntUserData = Object.freeze({
        write: (key, value) => {
          window.localStorage.setItem(`${key}`, `${value}`);
        },
        read: (key) => {
          return window.localStorage.getItem(`${key}`);
        },
        remove: (key) => {
          window.localStorage.removeItem(`${key}`);
        },
      }),
      setViTriWidget = (w, h) => {
        if (h < 0.5) {
          cntTimeWidget.style.bottom = "auto";
          if (
            h <
            cntTimeWidget.getBoundingClientRect().height / windowSize.height
          )
            cntTimeWidget.style.top = "0";
          else
            cntTimeWidget.style.top = `${
              windowSize.height * h -
              cntTimeWidget.getBoundingClientRect().height / 2
            }px`;
        } else {
          cntTimeWidget.style.top = "auto";
          if (
            h >
            1 - cntTimeWidget.getBoundingClientRect().height / windowSize.height
          )
            cntTimeWidget.style.bottom = "0";
          else
            cntTimeWidget.style.bottom = `${
              windowSize.height * (1 - h) -
              cntTimeWidget.getBoundingClientRect().height / 2
            }px`;
        }
        if (w < 0.5) {
          cntTimeWidget.style.right = "auto";
          if (
            w <
            cntTimeWidget.getBoundingClientRect().width / windowSize.width
          )
            cntTimeWidget.style.left = "0";
          else
            cntTimeWidget.style.left = `${
              windowSize.width * w -
              cntTimeWidget.getBoundingClientRect().width / 2
            }px`;
        } else {
          cntTimeWidget.style.left = "auto";
          if (
            w >
            1 - cntTimeWidget.getBoundingClientRect().width / windowSize.width
          )
            cntTimeWidget.style.right = "0";
          else
            cntTimeWidget.style.right = `${
              windowSize.width * (1 - w) -
              cntTimeWidget.getBoundingClientRect().width / 2
            }px`;
        }
      },
      mouseMoveOnDocumentEvent = (e) => {
        if (widgetMove) {
          cntTimeOnWindowSize.width = e.clientX / windowSize.width;
          cntTimeOnWindowSize.height = e.clientY / windowSize.height;
          setViTriWidget(cntTimeOnWindowSize.width, cntTimeOnWindowSize.height);
        }
      },
      blockHoverDoubleClick = (e) => {
        if (widgetMove) {
          e.preventDefault();
          widgetMove = false;
          window.document.removeEventListener(
            "mousemove",
            mouseMoveOnDocumentEvent
          );
          getViTriWidget(windowSize.width, windowSize.height);
          cntUserData.write("cntWidgetWidth", cntTimeOnWindowSize.width);
          cntUserData.write("cntWidgetHeight", cntTimeOnWindowSize.height);
          if (
            window.document.querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntBlockHover"
            ) != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntBlockHover"
              )
              .removeAttribute("active");
        }
      },
      cntMoveButtonClicked = () => {
        widgetMove = true;
        window.document.addEventListener("mousemove", mouseMoveOnDocumentEvent);

        window.document
          .querySelector(
            "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > span"
          )
          .removeEventListener("click", cntSecondDropdownClicked);
        if (
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul"
            )
            .getAttribute("active") != null
        ) {
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
            )
            .removeEventListener("click", cntShowSecondsClicked);
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
            )
            .removeEventListener("click", alternatingSecondsClicked);
          if (
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
              )
              .getAttribute("active") != null
          )
            document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul > li > span > span:nth-child(2)"
              )
              .removeEventListener("click", progressStyleClicked);
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
            )
            .removeEventListener("click", secondsProgressCountDownClicked);
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
            )
            .removeEventListener("click", cntSmoothSecondsClicked);
        }
        window.document
          .querySelector(
            "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > span > span.cntHour12Switch.cntSwitch"
          )
          .removeEventListener("click", hour12SwitchClicked);
        if (
          document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul"
            )
            .getAttribute("active") != null
        )
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
            )
            .removeEventListener("click", showAMPMClicked);
        window.document
          .querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > span > span.cntAutoUpdateSwitch.cntSwitch"
          )
          .removeEventListener("click", autoUpdateSwitchClicked);
        if (
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntUpdateSettings"
            )
            .getAttribute("active") != null
        ) {
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntUpdateSettings > li:nth-child(1) > span > span.cntSwitch"
            )
            .removeEventListener("click", updateEveryPageLoadsClicked);
          window.document
            .querySelector("#cntTimeUpdate")
            .removeEventListener("click", cntCheckUpdateAfterSelected);
        }
        if (
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntCheckForUpdate > li > span"
            )
            .getAttribute("active") != null
        )
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntCheckForUpdate > li > span"
            )
            .removeEventListener("click", checkUpdateClicked);

        if (
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu"
            )
            .getAttribute("active") != null
        )
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu"
            )
            .removeAttribute("active");
        menuActive = false;
        if (
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntBlockHover"
            )
            .getAttribute("active") != ""
        )
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntBlockHover"
            )
            .setAttribute("active", "");
        window.document
          .querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntBlockHover"
          )
          .addEventListener("dblclick", blockHoverDoubleClick, { once: true });
      },
      cntShowSecondsClicked = () => {
        if (!secondsHided) {
          cntUserData.write("cntHideSeconds", "1");
          window.document.querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntSeconds"
          ).style.display = "none";
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntShowSecondsSwitch"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntShowSecondsSwitch"
              )
              .removeAttribute("active");
        } else {
          cntUserData.write("cntHideSeconds", "0");
          window.document.querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntSeconds"
          ).style.display = "inline";
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntShowSecondsSwitch"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntShowSecondsSwitch"
              )
              .setAttribute("active", "");
        }
        window.document.querySelector(
          "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntClock > span.cntClockText > span.cntSeconds"
        ).innerHTML = `:${seconds}`;
        updateSeconds.size(
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().width,
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().height
        );
        secondsHided = !secondsHided;
      },
      cntSmoothSecondsClicked = () => {
        if (smoothSeconds) {
          cntUserData.write("cntSmoothSeconds", "0");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntSmoothSecondsSwitch"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntSmoothSecondsSwitch"
              )
              .removeAttribute("active");
        } else {
          cntUserData.write("cntSmoothSeconds", "1");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntSmoothSecondsSwitch"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul li span span.cntSmoothSecondsSwitch"
              )
              .setAttribute("active", "");
        }
        smoothSeconds = !smoothSeconds;
      },
      progressStyleClicked = () => {
        if (
          paintGradually !=
          window.document.querySelector("#paintGradually").checked
        ) {
          paintGradually = !paintGradually;
          if (paintGradually) cntUserData.write("cntPaintGradually", "1");
          else cntUserData.write("cntPaintGradually", "0");
        }
      },
      alternatingSecondsClicked = () => {
        if (alternatingSeconds) {
          cntUserData.write("cntAlternatingSeconds", "0");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntSwitch.alternatingSecondsSwitch"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntSwitch.alternatingSecondsSwitch"
              )
              .removeAttribute("active");
          if (
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
              )
              .setAttribute("active", "");
          if (paintGradually)
            window.document.querySelector("#paintGradually").checked = true;
          else window.document.querySelector("#eraseGradually").checked = true;
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul > li > span > span:nth-child(2)"
            )
            .addEventListener("click", progressStyleClicked);
        } else {
          cntUserData.write("cntAlternatingSeconds", "1");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntSwitch.alternatingSecondsSwitch"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntSwitch.alternatingSecondsSwitch"
              )
              .setAttribute("active", "");
          if (
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
              )
              .removeAttribute("active");
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul > li > span > span:nth-child(2)"
            )
            .removeEventListener("click", progressStyleClicked);
        }
        alternatingSeconds = !alternatingSeconds;
      },
      cntSecondDropdownClicked = () => {
        if (
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul"
            )
            .getAttribute("active") != null
        ) {
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
            )
            .removeEventListener("click", cntShowSecondsClicked);
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
            )
            .removeEventListener("click", alternatingSecondsClicked);
          if (
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul > li > span > span:nth-child(2)"
              )
              .removeEventListener("click", progressStyleClicked);
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
            )
            .removeEventListener("click", cntSmoothSecondsClicked);
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul"
              )
              .removeAttribute("active");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
            )
            .removeEventListener("click", secondsProgressCountDownClicked);
        } else {
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown ul"
              )
              .setAttribute("active", "");
          if (secondsHided) {
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
                )
                .getAttribute("ative") != null
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
                )
                .removeAttribute("active");
          } else {
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
                )
                .getAttribute("ative") != ""
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
                )
                .setAttribute("active", "");
          }
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
            )
            .addEventListener("click", cntShowSecondsClicked);
          if (alternatingSeconds) {
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
                )
                .setAttribute("active", "");
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul > li > span > span:nth-child(2)"
              )
              .removeEventListener("click", progressStyleClicked);
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
                )
                .removeAttribute("active");
          } else {
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
                )
                .removeAttribute("active");
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
                )
                .setAttribute("active", "");
            if (paintGradually)
              window.document.querySelector("#paintGradually").checked = true;
            else
              window.document.querySelector("#eraseGradually").checked = true;
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul > li > span > span:nth-child(2)"
              )
              .addEventListener("click", progressStyleClicked);
          }
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
            )
            .addEventListener("click", alternatingSecondsClicked);
          if (smoothSeconds) {
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
                )
                .setAttribute("active", "");
          } else {
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
                )
                .removeAttribute("active");
          }
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
            )
            .addEventListener("click", cntSmoothSecondsClicked);
          if (secondsProgressCountDown) {
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
                )
                .setAttribute("active", "");
          } else {
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
                )
                .removeAttribute("active");
          }
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
            )
            .addEventListener("click", secondsProgressCountDownClicked);
        }
      },
      showAMPMClicked = () => {
        if (showAMPM) {
          cntUserData.write("cntShowAMPM", "0");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntShowAMPMSwitch.cntSwitch"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntShowAMPMSwitch.cntSwitch"
              )
              .removeAttribute("active");
          window.document.querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntAmPm"
          ).style.display = "none";
        } else {
          cntUserData.write("cntShowAMPM", "1");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntShowAMPMSwitch.cntSwitch"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntShowAMPMSwitch.cntSwitch"
              )
              .setAttribute("active", "");
          window.document.querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntAmPm"
          ).style.display = "inline";
          if (hours * 60 + minutes < 720)
            window.document.querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntAmPm"
            ).innerHTML = " AM";
          else
            window.document.querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntAmPm"
            ).innerHTML = " PM";
        }
        showAMPM = !showAMPM;
        updateSeconds.size(
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().width,
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().height
        );
      },
      hour12SwitchClicked = () => {
        if (hour12) {
          cntUserData.write("cnt12Hour", "0");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntHour12Switch"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntHour12Switch"
              )
              .removeAttribute("active");
          window.document.querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntHours"
          ).innerHTML = hours;
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntShowAMPMSwitch.cntSwitch"
            )
            .removeEventListener("click", showAMPMClicked);
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntShowAMPM ul"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntShowAMPM ul"
              )
              .removeAttribute("active");
          showAMPM = true;
          showAMPMClicked();
        } else {
          cntUserData.write("cnt12Hour", "1");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntHour12Switch"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntHour12Switch"
              )
              .setAttribute("active", "");
          if (hours <= 12)
            window.document.querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntHours"
            ).innerHTML = hours;
          else
            window.document.querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntHours"
            ).innerHTML = hours - 12;
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntShowAMPM ul"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntShowAMPM ul"
              )
              .setAttribute("active", "");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntShowAMPMSwitch.cntSwitch"
            )
            .addEventListener("click", showAMPMClicked);
          showAMPM = false;
          showAMPMClicked();
        }
        hour12 = !hour12;
        updateSeconds.size(
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().width,
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().height
        );
      },
      checkForUpdate = async () => {
        const data = await fetch(
          "https:/" +
            "/raw.githubusercontent.com/chuanghiten/CNT-User-Script/main/cntDigitalClockWidget/version.json"
        )
          .then((v) => {
            if (v.status == 200 || v.status == 304) return v.json();
            else return false;
          })
          .catch((e) => {
            console.log(e);
            return false;
          });
        if (data) {
          const currentVersionArray = currentVersion.split("."),
            newVersionArray = data.version.split(".");
          const updateStatus = currentVersionArray.every((c, i) => {
            if (c < newVersionArray[i]) {
              window.document.querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
              ).innerHTML =
                '<span><a href="https:/' +
                '/raw.githubusercontent.com/chuanghiten/CNT-User-Script/main/cntDigitalClockWidget/script.user.js">A new update is available. Check it now !!!</a></span><span title="Close" style="margin-left: 50px;">[ <span style="color: #f94b53; cursor: pointer;">X</span> ]</span>';
              if (
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                  )
                  .getAttribute("active") != ""
              )
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                  )
                  .setAttribute("active", "");
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus span + span span"
                )
                .addEventListener(
                  "click",
                  () => {
                    if (
                      window.document
                        .querySelector(
                          "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                        )
                        .getAttribute("active") != null
                    )
                      window.document
                        .querySelector(
                          "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                        )
                        .removeAttribute("active");
                  },
                  {
                    once: true,
                  }
                );
              return false;
            } else return true;
          });
          if (updateStatus) {
            let dl = 10000;
            window.document.querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
            ).innerHTML =
              '<div>No updates available!<div style="width: 100%; height: 1px; background: #fff; transform-origin: 0 0; margin-top: 2px"></div></div>';
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                )
                .setAttribute("active", "");
            cntDelayMs = Date.now() + dl;
            cntDelayCallBack = () => {
              if (
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                  )
                  .getAttribute("active") != null
              )
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                  )
                  .removeAttribute("active");
            };
            cntDelayFollowCallBack = () => {
              let progress = cntDelayMs - Date.now();
              window.document.querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus div div"
              ).style.transform = `scaleX(${progress / dl})`;
              if (progress < dl / 3)
                window.document.querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus div div"
                ).style.background = "#f94b53";
            };
            cntDelayEnable = true;
          }
        } else {
          let dl = 10000;
          window.document.querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
          ).innerHTML =
            '<div><a href="https:/' +
            '/raw.githubusercontent.com/chuanghiten/CNT-User-Script/main/cntDigitalClockWidget/script.user.js" style="display: inline; color: #f94b53; font-weight: bold">Update check failed! Check manually now.</a><div style="width: 100%; height: 1px; background: #fff; transform-origin: 0 0; margin-top: 2px"></div></div>';
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
              )
              .setAttribute("active", "");
          cntDelayMs = Date.now() + dl;
          cntDelayCallBack = () => {
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus"
                )
                .removeAttribute("active");
          };
          cntDelayFollowCallBack = () => {
            let progress = cntDelayMs - Date.now();
            window.document.querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus div div"
            ).style.transform = `scaleX(${progress / dl})`;
            if (progress < dl / 3)
              window.document.querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntNotiStatus div div"
              ).style.background = "#f94b53";
          };
          cntDelayEnable = true;
        }
        updateChecking = false;
        if (
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li > span.cntUpdate + ul li span span + span"
            )
            .getAttribute("active") != null
        )
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li > span.cntUpdate + ul li span span + span"
            )
            .removeAttribute("active");
      },
      checkUpdateClicked = () => {
        if (!updateChecking) {
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li > span.cntUpdate + ul li span span + span"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li > span.cntUpdate + ul li span span + span"
              )
              .setAttribute("active", "");
          updateChecking = true;
          checkForUpdate();
        }
      },
      cntCheckUpdateAfterSelected = () => {
        if (
          cntCheckUpdateAfter !=
          window.document.querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings select"
          ).selectedIndex
        ) {
          cntCheckUpdateAfter = window.document.querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings select"
          ).selectedIndex;
          cntUserData.write("cntCheckUpdateAfter", cntCheckUpdateAfter);
        }
      },
      updateEveryPageLoadsClicked = () => {
        if (updateEveryPageLoads) {
          cntUserData.write("updateEveryPageLoads", "0");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
              )
              .removeAttribute("active");
        } else {
          cntUserData.write("updateEveryPageLoads", "1");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
              )
              .setAttribute("active", "");
          updateChecking = true;
          checkForUpdate();
        }
        updateEveryPageLoads = !updateEveryPageLoads;
      },
      autoUpdateSwitchClicked = () => {
        if (autoCheckUpdate) {
          cntUserData.write("cntAutoCheckUpdate", "0");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntAutoUpdateSwitch.cntSwitch"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntAutoUpdateSwitch.cntSwitch"
              )
              .removeAttribute("active");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
            )
            .removeEventListener("click", updateEveryPageLoadsClicked);
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings select"
            )
            .removeEventListener("click", cntCheckUpdateAfterSelected);
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate + ul.cntUpdateSettings"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate + ul.cntUpdateSettings"
              )
              .removeAttribute("active");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate"
              )
              .setAttribute("active", "");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li > span.cntUpdate + ul li > span"
            )
            .addEventListener("click", checkUpdateClicked);
        } else {
          cntUserData.write("cntAutoCheckUpdate", "1");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntAutoUpdateSwitch.cntSwitch"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntAutoUpdateSwitch.cntSwitch"
              )
              .setAttribute("active", "");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li > span.cntUpdate + ul li > span"
            )
            .removeEventListener("click", checkUpdateClicked);
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate"
            )
            .removeAttribute("active");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate + ul.cntUpdateSettings"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate + ul.cntUpdateSettings"
              )
              .setAttribute("active", "");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
            )
            .addEventListener("click", updateEveryPageLoadsClicked);
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings select"
            )
            .addEventListener("click", cntCheckUpdateAfterSelected);
        }
        autoCheckUpdate = !autoCheckUpdate;
      },
      cntButtonMenuClicked = () => {
        if (!menuActive) {
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu"
              )
              .setAttribute("active", "");
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntMoveButton"
            )
            .addEventListener("click", cntMoveButtonClicked, { once: true });
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li.cntSecondsDropdown span"
            )
            .addEventListener("click", cntSecondDropdownClicked);
          if (
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul"
              )
              .getAttribute("active") != null
          ) {
            if (secondsHided) {
              if (
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
                  )
                  .getAttribute("active") != null
              )
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
                  )
                  .removeAttribute("active");
            } else {
              if (
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
                  )
                  .getAttribute("active") != ""
              )
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
                  )
                  .setAttribute("active", "");
            }
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
              )
              .addEventListener("click", cntShowSecondsClicked);
            if (alternatingSeconds) {
              if (
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
                  )
                  .getAttribute("active") != ""
              )
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
                  )
                  .setAttribute("active", "");
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul > li > span > span:nth-child(2)"
                )
                .removeEventListener("click", progressStyleClicked);
              if (
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
                  )
                  .getAttribute("active") != null
              )
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
                  )
                  .removeAttribute("active");
            } else {
              if (
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
                  )
                  .getAttribute("active") != null
              )
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
                  )
                  .removeAttribute("active");
              if (
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
                  )
                  .getAttribute("active") != ""
              )
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
                  )
                  .setAttribute("active", "");
              if (paintGradually)
                window.document.querySelector("#paintGradually").checked = true;
              else
                window.document.querySelector("#eraseGradually").checked = true;
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul > li > span > span:nth-child(2)"
                )
                .addEventListener("click", progressStyleClicked);
            }
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
              )
              .addEventListener("click", alternatingSecondsClicked);
            if (secondsProgressCountDown) {
              if (
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
                  )
                  .getAttribute("active") != ""
              )
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
                  )
                  .setAttribute("active", "");
            } else {
              if (
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
                  )
                  .getAttribute("active") != null
              )
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
                  )
                  .removeAttribute("active");
            }
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
              )
              .addEventListener("click", secondsProgressCountDownClicked);
            if (smoothSeconds) {
              if (
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
                  )
                  .getAttribute("active") != ""
              )
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
                  )
                  .setAttribute("active", "");
            } else {
              if (
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
                  )
                  .getAttribute("active") != null
              )
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
                  )
                  .removeAttribute("active");
            }
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
              )
              .addEventListener("click", cntSmoothSecondsClicked);
          }
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > span > span.cntHour12Switch.cntSwitch"
            )
            .addEventListener("click", hour12SwitchClicked);
          if (hour12) {
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > span > span.cntHour12Switch.cntSwitch"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > span > span.cntHour12Switch.cntSwitch"
                )
                .setAttribute("active", "");
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul"
                )
                .setAttribute("active", "");
            if (showAMPM) {
              if (
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
                  )
                  .getAttribute("avtive") != ""
              )
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
                  )
                  .setAttribute("active", "");
            } else {
              if (
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
                  )
                  .getAttribute("avtive") != null
              )
                window.document
                  .querySelector(
                    "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
                  )
                  .removeAttribute("active");
            }
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
              )
              .addEventListener("click", showAMPMClicked);
          } else {
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > span > span.cntHour12Switch.cntSwitch"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > span > span.cntHour12Switch.cntSwitch"
                )
                .removeAttribute("active");
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
              )
              .removeEventListener("click", showAMPMClicked);
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
                )
                .getAttribute("avtive") != null
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
                )
                .removeAttribute("active");
          }
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > span > span.cntAutoUpdateSwitch.cntSwitch"
            )
            .addEventListener("click", autoUpdateSwitchClicked);
          if (autoCheckUpdate) {
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntAutoUpdateSwitch.cntSwitch"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntAutoUpdateSwitch.cntSwitch"
                )
                .setAttribute("active", "");
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate"
                )
                .removeAttribute("active");
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate + ul.cntUpdateSettings"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate + ul.cntUpdateSettings"
                )
                .setAttribute("active", "");
            if (updateEveryPageLoads) {
              if (
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
                  )
                  .getAttribute("active") != ""
              )
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
                  )
                  .setAttribute("active", "");
            } else {
              if (
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
                  )
                  .getAttribute("active") != null
              )
                window.document
                  .querySelector(
                    "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings li span span.cntSwitch"
                  )
                  .removeAttribute("active");
            }
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntUpdateSettings > li:nth-child(1) > span > span.cntSwitch"
              )
              .addEventListener("click", updateEveryPageLoadsClicked);
            window.document.querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li ul.cntUpdateSettings select"
            ).selectedIndex = cntCheckUpdateAfter;
            window.document
              .querySelector("#cntTimeUpdate")
              .addEventListener("click", cntCheckUpdateAfterSelected);
          } else {
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntAutoUpdateSwitch.cntSwitch"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span span.cntAutoUpdateSwitch.cntSwitch"
                )
                .removeAttribute("active");
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate + ul.cntUpdateSettings"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate + ul.cntUpdateSettings"
                )
                .removeAttribute("active");
            if (
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate"
                )
                .getAttribute("active") != ""
            )
              window.document
                .querySelector(
                  "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu ul li span.cntUpdate + ul.cntCheckForUpdate"
                )
                .setAttribute("active", "");
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntCheckForUpdate > li > span"
              )
              .addEventListener("click", checkUpdateClicked);
          }
        } else {
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntMoveButton"
            )
            .removeEventListener("click", cntMoveButtonClicked);
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > span"
            )
            .removeEventListener("click", cntSecondDropdownClicked);
          if (
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul"
              )
              .getAttribute("active") != null
          ) {
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(1) > span > span.cntShowSecondsSwitch.cntSwitch"
              )
              .removeEventListener("click", cntShowSecondsClicked);
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > span > span.alternatingSecondsSwitch.cntSwitch"
              )
              .removeEventListener("click", alternatingSecondsClicked);
            if (
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul"
                )
                .getAttribute("active") != null
            )
              window.document
                .querySelector(
                  "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(2) > ul > li > span > span:nth-child(2)"
                )
                .removeEventListener("click", progressStyleClicked);
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
              )
              .removeEventListener("click", secondsProgressCountDownClicked);
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(4) > span > span.cntSmoothSecondsSwitch.cntSwitch"
              )
              .removeEventListener("click", cntSmoothSecondsClicked);
          }
          window.document
            .querySelector(
              "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > span > span.cntHour12Switch.cntSwitch"
            )
            .removeEventListener("click", hour12SwitchClicked);
          if (
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body div.Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntShowAMPM > ul > li > span > span.cntShowAMPMSwitch.cntSwitch"
              )
              .removeEventListener("click", showAMPMClicked);
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > span > span.cntAutoUpdateSwitch.cntSwitch"
            )
            .removeEventListener("click", autoUpdateSwitchClicked);
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntCheckForUpdate > li > span"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntCheckForUpdate > li > span"
              )
              .removeEventListener("click", checkUpdateClicked);
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntUpdateSettings"
              )
              .getAttribute("active") != null
          ) {
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li:nth-child(4) > ul.cntUpdateSettings > li:nth-child(1) > span > span.cntSwitch"
              )
              .removeEventListener("click", updateEveryPageLoadsClicked);
            window.document
              .querySelector("#cntTimeUpdate")
              .removeEventListener("click", cntCheckUpdateAfterSelected);
          }
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntMenu"
              )
              .removeAttribute("active");
        }
        menuActive = !menuActive;
      },
      mouseEnterCntClock = () => {
        updateSeconds.size(
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().width,
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().height
        );
        updateSeconds.seconds(
          (time.getSeconds() + time.getMilliseconds() / 999) / 60,
          time.getMinutes()
        );
        window.document
          .querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
          )
          .addEventListener("mouseleave", mouseLeaveCntClock, { once: true });
        window.document
          .querySelectorAll(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntButtonMenu"
          )
          .forEach((c) => {
            c.addEventListener("click", cntButtonMenuClicked);
          });
      },
      mouseLeaveCntClock = () => {
        updateSeconds.size(
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().width,
          window.document
            .querySelector(
              "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
            )
            .getBoundingClientRect().height
        );
        updateSeconds.seconds(
          (time.getSeconds() + time.getMilliseconds() / 999) / 60,
          time.getMinutes()
        );
        window.document
          .querySelector(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
          )
          .addEventListener("mouseenter", mouseEnterCntClock, { once: true });
        window.document
          .querySelectorAll(
            "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntButtonMenu"
          )
          .forEach((c) => {
            c.removeEventListener("click", cntButtonMenuClicked);
          });
      },
      secondsProgressCountDownClicked = () => {
        if (secondsProgressCountDown) {
          cntUserData.write("cntSecondsProgressCountDown", "0");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
              )
              .getAttribute("active") != null
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
              )
              .removeAttribute("active");
        } else {
          cntUserData.write("cntSecondsProgressCountDown", "1");
          if (
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
              )
              .getAttribute("active") != ""
          )
            window.document
              .querySelector(
                "html body .Chua.Nghi.Ten.Digital.Clock.Widget > div.cntMenu > ul > li.cntSecondsDropdown > ul > li:nth-child(3) > span > span.secondsProgressCountDown.cntSwitch"
              )
              .setAttribute("active", "");
        }
        secondsProgressCountDown = !secondsProgressCountDown;
      };
    window.document
      .querySelector("html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock")
      .addEventListener("mouseenter", mouseEnterCntClock, { once: true });
    if (cntUserData.read("cntHideSeconds") != null)
      secondsHided = Number(cntUserData.read("cntHideSeconds"));
    if (secondsHided)
      window.document.querySelector(
        "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntSeconds"
      ).style.display = "none";
    if (cntUserData.read("cntSmoothSeconds") != null)
      smoothSeconds = Number(cntUserData.read("cntSmoothSeconds"));
    if (cntUserData.read("cnt12Hour") != null)
      hour12 = Number(cntUserData.read("cnt12Hour"));
    if (cntUserData.read("cntShowAMPM") != null)
      showAMPM = Number(cntUserData.read("cntShowAMPM"));
    window.requestAnimationFrame(updateTimeWithFPS);
    if (showAMPM) {
      if (hours * 60 + minutes < 720)
        window.document.querySelector(
          "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntAmPm"
        ).innerHTML = " AM";
      else
        window.document.querySelector(
          "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntAmPm"
        ).innerHTML = " PM";
    } else
      window.document.querySelector(
        "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock .cntClockText .cntAmPm"
      ).style.display = "none";
    if (cntUserData.read("cntWidgetWidth") != null)
      cntTimeOnWindowSize.width = Number(cntUserData.read("cntWidgetWidth"));
    if (cntUserData.read("cntWidgetHeight") != null)
      cntTimeOnWindowSize.height = Number(cntUserData.read("cntWidgetHeight"));
    if (cntUserData.read("cntAutoCheckUpdate") != null)
      autoCheckUpdate = Number(cntUserData.read("cntAutoCheckUpdate"));
    if (cntUserData.read("updateEveryPageLoads") != null)
      updateEveryPageLoads = Number(cntUserData.read("updateEveryPageLoads"));
    if (cntUserData.read("cntCheckUpdateAfter") != null)
      cntCheckUpdateAfter = Number(cntUserData.read("cntCheckUpdateAfter"));
    if (cntUserData.read("cntAlternatingSeconds") != null)
      alternatingSeconds = Number(cntUserData.read("cntAlternatingSeconds"));
    if (cntUserData.read("cntPaintGradually") != null)
      paintGradually = Number(cntUserData.read("cntPaintGradually"));
    updateSeconds.size(
      window.document
        .querySelector(
          "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
        )
        .getBoundingClientRect().width,
      window.document
        .querySelector(
          "html body .Chua.Nghi.Ten.Digital.Clock.Widget .cntClock"
        )
        .getBoundingClientRect().height
    );
    if (cntUserData.read("cntSecondsProgressCountDown") != null)
      secondsProgressCountDown = Number(
        cntUserData.read("cntSecondsProgressCountDown")
      );
    setViTriWidget(cntTimeOnWindowSize.width, cntTimeOnWindowSize.height);
    getViTriWidget(windowSize.width, windowSize.height);
    if (autoCheckUpdate && updateEveryPageLoads) {
      updateChecking = true;
      checkForUpdate();
    }
  });
})();
