var cube = document.querySelector('.cube');
var radioGroup = document.querySelector('.radio-group');

let winBtn = document.querySelector('.winBtn');

winBtn.addEventListener('click', (_) => {
  console.log('Breakout victory ?', breakoutWin);
  console.log('Path victory ?', winPath);
});

var currentClass = '';

function changeSide() {
  var checkedRadio = radioGroup.querySelector(':checked');
  var showClass = 'show-' + checkedRadio.value;
  if ( currentClass ) {
    cube.classList.remove( currentClass );
  }
  cube.classList.add( showClass );
  currentClass = showClass;
}
// set initial side
changeSide();

radioGroup.addEventListener( 'change', changeSide );