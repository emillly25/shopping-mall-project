const bannerImages = document.querySelectorAll('.banner-img');
bannerImages.forEach(image => {
  image.addEventListener('click', function (e) {
    // e.preventDefault();
    const selectedImg = e.target.alt;
    switch (selectedImg) {
      case '눈먼 자들의 도시':
        window.location.href = '/bestseller';
        break;
      case '나미야 잡화점의 기적':
        window.location.href = '/novel';
        break;
      case '다섯 시의 남자':
        window.location.href = '/poet';
        break;
      case '세상에서 가장 재미있는 88가지 심리실험: 자기계발편':
        window.location.href = '/self';
        break;
      case '신문으로 공부하는 말랑말랑 시사상식 경제 경영 (2020)':
        window.location.href = '/economy';
        break;
      default:
        break;
    }
  });
});
