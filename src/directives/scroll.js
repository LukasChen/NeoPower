export default {
  inserted(el, binding) {
    const scrollBreak = parseInt(binding.arg);
    let lastScroll = 0;
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    function checkScroll (event) {
      if (window.scrollY > scrollBreak && lastScroll < scrollBreak ) {
        binding.value(true,event);
      }
      if (window.scrollY < scrollBreak && lastScroll > scrollBreak) {
        binding.value(false,event);
      }
      lastScroll = window.scrollY;
    }
  }
}
