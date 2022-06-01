// footer.js

const imageSliderEl = document.querySelector('.slider-wrap');
imageSliderEl.innerHTML = `
<ul class="slider" id="slider">
      <li>
        <img src="../img/red.jpeg" />
      </li>
      <li>
        <img src="../img/orange.jpeg" />
      </li>
      <li>
        <img src="../img/yellow.jpeg" />
      </li>
      <li>
        <img src="../img/green.jpeg" />
      </li>
      <li>
        <img src="../img/blue.jpeg" />
      </li>
    </ul>

    <div class="btn next" id="next">
      <i class="fa fa-arrow-right"></i>
    </div>
    <div class="btn previous" id="previous">
      <i class="fa fa-arrow-left"></i>
    </div>

    <div class="indicator-wrap" id="indicator-wrap">
      <ul></ul>
    </div>

    <div class="control-wrap play" id="control-wrap">
      <i class="fa fa-pause" id="pause" data-status="pause"></i>
      <i class="fa fa-play" id="play" data-status="play"></i>
    </div>
`;
class Slider {
  #currentPosition = 0;
  #slideNumber = 0;
  #slideWidth = 0;
  #intervalId;
  #autoPlay = true;
  sliderWrapEl;
  sliderListEl;
  sliderListLiEl;
  sliderListImgEl;
  nextBtnEl;
  previousBtnEl;
  indicatorWrapEl;
  controlWrapEl;
  containerEl;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAutoplay();
  }

  // element 가져오기
  assignElement() {
    this.containerEl = document.querySelector('.container');
    this.sliderWrapEl = document.querySelector('.slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.sliderListLiEl = this.sliderListEl.querySelectorAll('li');
    this.sliderListImgEl = this.sliderListEl.querySelectorAll('img');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  // image slider 개수
  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  // image slider 하나의 width
  initSlideWidth() {
    this.#slideWidth = this.containerEl.clientWidth;
    console.log(this.containerEl.clientWidth);
  }

  // image slider 전체의 width
  initSliderListWidth() {
    let paddingValue = window
      .getComputedStyle(this.containerEl)
      .getPropertyValue('padding-top');
    this.sliderWrapEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
    this.sliderListEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
    this.sliderListLiEl.forEach(
      li => (li.style.width = `${this.#slideWidth}px`),
    );
    this.sliderListImgEl.forEach(
      img => (img.style.width = `${this.#slideWidth}px`),
    );
  }

  // 이전-다음 버튼 클릭 시 / indicator 클릭 시 / 재생-일시정지 버튼을 클릭 시의 이벤트

  addEvent() {
    // 1. 이전-다음 버튼 클릭 시
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    // indicator width 조정
    this.indicatorWrapEl.style.width = `${this.#slideWidth}px`;
    // 2. indicator 클릭 시
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );

    // 3. 재생-일시정지 버튼을 클릭 시
    this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
  }

  // next 버튼을 눌렀을 때 다음 image Slider 로 넘어가기
  moveToRight() {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    if (this.#autoPlay) {
      // 자동재생 중간에 next 버튼을 눌렀다면, 자동재생 인터벌 초기화
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator(); // 현재 image slider에 해당되는 indicator만 활성화!
  }

  // prev 버튼을 눌렀을 때 이전 image Slider 로 넘어가기
  moveToLeft() {
    this.#currentPosition -= 1;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    if (this.#autoPlay) {
      // 자동재생 중간에 prev 버튼을 눌렀다면, 자동재생 인터벌 초기화
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator(); // 현재 image slider에 해당되는 indicator만 활성화!
  }

  // image slider 개수만큼 indicator 삽입
  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  // indicator 클릭 시
  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#slideWidth * this.#currentPosition
      }px`;
      this.setIndicator(); // 현재 image slider에 해당되는 indicator만 활성화!
    }
  }

  // 클릭된 indicator(동그라미)만 활성화하기!
  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }

  // 재생-일시정지 버튼을 클릭 시
  togglePlay(event) {
    // 재생 버튼을 클릭할 시
    if (event.target.dataset.status === 'play') {
      this.#autoPlay = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.initAutoplay(); // 자동 재생 ON
    } else if (event.target.dataset.status === 'pause') {
      // 일시정지 버튼을 클릭할 시
      this.#autoPlay = false;
      this.controlWrapEl.classList.remove('play');
      this.controlWrapEl.classList.add('pause');
      clearInterval(this.#intervalId);
    }
  }

  // 자동재생 (moveToRight 메소드를 3초에 한번씩 실행하는 함수)
  initAutoplay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }
}

const nextBtn = document.querySelector('.next');
nextBtn.style.left = `${document.querySelector('.container').clientWidth}px`;
document
  .querySelector('.slider-wrap')
  .addEventListener('mouseover', function () {
    nextBtn.style.left = `${
      document.querySelector('.container').clientWidth - nextBtn.clientWidth
    }px`;
  });
document
  .querySelector('.slider-wrap')
  .addEventListener('mouseout', function () {
    nextBtn.style.left = `${
      document.querySelector('.container').clientWidth
    }px`;
  });
const slider = new Slider();
