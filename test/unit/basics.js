test( 'init', function( assert ) {
  'use strict';

  var transformProperty = getStyleProperty('transform');
  assert.expect( 25 + ( transformProperty ? 1 : 0 ) );
  var done = assert.async();

  var testElem = document.querySelector('.test--basics');
  var h2 = testElem.querySelector('h2');
  h2.textContent = 'Drag this element';
  classie.add( testElem, 'running' );
  var draggieElem =  testElem.querySelector('.test--basics .draggie');
  var draggie = new Draggabilly( draggieElem );

  equal( draggieElem.style.position, 'relative', 'position: relative set' );

  var didPointerDown, didPointerMove, didPointerUp, didDragStart, didDragMove,
    didDragEnd;

  draggie.once( 'pointerDown', function( event, pointer ) {
    didPointerDown = true;
    equal( typeof event, 'object', 'pointerDown event argument' );
    ok( pointer.pageX, 'pointerDown pageX' );
  });

  draggie.once( 'pointerMove', function( event, pointer, moveVector ) {
    didPointerMove = true;
    equal( typeof event, 'object', 'pointerMove event argument' );
    equal( typeof pointer.pageX, 'number', 'pointerMove pageX' );
    equal( typeof moveVector.x, 'number', 'pointerMove moveVector.x' );
    equal( typeof moveVector.y, 'number', 'pointerMove moveVector.y' );
  });

  draggie.once( 'pointerUp', function( event, pointer ) {
    didPointerUp = true;
    equal( typeof event, 'object', 'pointerUp event argument' );
    ok( pointer.pageX, 'pointerUp pageX' );
  });

  draggie.once( 'dragStart', function( evnet, pointer ) {
    didDragStart = true;
    equal( typeof event, 'object', 'didDragStart event argument' );
    equal( typeof pointer.pageX, 'number', 'didDragStart pageX' );
  });

  draggie.once( 'dragMove', function( event, pointer, moveVector ) {
    didDragMove = true;
    equal( typeof event, 'object', 'dragMove event argument' );
    equal( typeof pointer.pageX, 'number', 'dragMove pageX' );
    equal( typeof moveVector.x, 'number', 'dragMove moveVector.x' );
    equal( typeof moveVector.y, 'number', 'dragMove moveVector.y' );
  });

  draggie.once( 'dragEnd', function( event, pointer ) {
    didDragEnd = true;
    equal( typeof event, 'object', 'dragEnd event argument' );
    ok( pointer.pageX, 'dragEnd pageX' );

    ok( didPointerDown, 'didPointerDown' );
    ok( didPointerMove, 'didPointerMove' );
    ok( didPointerUp, 'didPointerUp' );
    ok( didDragStart, 'didDragStart' );
    ok( didDragMove, 'didDragMove' );
    ok( didDragEnd, 'didDragEnd' );

    ok( draggieElem.style.left, 'drag elem style left' );
    ok( draggieElem.style.top, 'drag elem style left' );
    if ( transformProperty ) {
      ok( !draggieElem.style[ transformProperty ], 'transform style removed' );
    }
    // done
    h2.textContent = 'basics: done';
    classie.remove( testElem, 'running' );
    done();
  });

});
