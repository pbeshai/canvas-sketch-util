var eases = require('eases');
var lerp = require('lerp');

var tween = function (props) {
  if ( props === void 0 ) props = {};

  var time = props.time; if ( time === void 0 ) time = 0;
  var from = props.from; if ( from === void 0 ) from = 0;
  var to = props.to; if ( to === void 0 ) to = 1;
  var duration = props.duration; if ( duration === void 0 ) duration = 1;
  var delay = props.delay; if ( delay === void 0 ) delay = 0;
  var edge = props.edge; if ( edge === void 0 ) edge = 0;
  var ease = props.ease; if ( ease === void 0 ) ease = 'linear';

  if (duration === 0) { return 0; }

  var t;

  var curEase = ease;
  var flip = false;
  var isEaseDef = typeof curEase === 'object' && (curEase.in || curEase.out);
  // EXPERIMENTAL... should figure out a better syntax
  if (edge !== 0) {
    var elapsed = Math.max(0, time - delay);
    var minEdge = Math.max(0, Math.min(edge, duration));
    var end = Math.max(0, duration - edge);
    if (elapsed <= minEdge) { // Animating in
      t = Math.min(1, elapsed / minEdge);
      if (isEaseDef) { curEase = curEase.in || 'linear'; }
    } else if (edge < duration && elapsed > end) { // Animating out
      t = Math.min(1, Math.max(0, elapsed - end) / edge);
      flip = true;
      if (isEaseDef) {
        curEase = curEase.out || 'linear';
      }
    } else { // In middle
      t = 1;
      if (isEaseDef) { curEase = curEase.middle || 'linear'; }
      else { curEase = 'linear'; }
    }
  } else {
    t = Math.min(1, Math.max(0, time - delay) / duration);
    if (isEaseDef) { curEase = curEase.in || 'linear'; }
  }

  if (curEase && curEase !== 'linear') {
    if (typeof curEase === 'function') { return ease(t); }
    if (!(curEase in eases)) {
      throw new Error(("Cannot find an easing function by the name of " + curEase));
    }
    t = eases[curEase](t);
    if (flip) { t = 1 - t; }
  }
  return lerp(from, to, t);
};
module.exports = tween;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdlZW4uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy90d2Vlbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlYXNlcyA9IHJlcXVpcmUoJ2Vhc2VzJyk7XG5jb25zdCBsZXJwID0gcmVxdWlyZSgnbGVycCcpO1xuXG5jb25zdCB0d2VlbiA9IChwcm9wcyA9IHt9KSA9PiB7XG4gIGNvbnN0IHtcbiAgICB0aW1lID0gMCxcbiAgICBmcm9tID0gMCxcbiAgICB0byA9IDEsXG4gICAgZHVyYXRpb24gPSAxLFxuICAgIGRlbGF5ID0gMCxcbiAgICBlZGdlID0gMCxcbiAgICBlYXNlID0gJ2xpbmVhcidcbiAgfSA9IHByb3BzO1xuXG4gIGlmIChkdXJhdGlvbiA9PT0gMCkgcmV0dXJuIDA7XG5cbiAgbGV0IHQ7XG5cbiAgbGV0IGN1ckVhc2UgPSBlYXNlO1xuICBsZXQgZmxpcCA9IGZhbHNlO1xuICBsZXQgaXNFYXNlRGVmID0gdHlwZW9mIGN1ckVhc2UgPT09ICdvYmplY3QnICYmIChjdXJFYXNlLmluIHx8IGN1ckVhc2Uub3V0KTtcbiAgLy8gRVhQRVJJTUVOVEFMLi4uIHNob3VsZCBmaWd1cmUgb3V0IGEgYmV0dGVyIHN5bnRheFxuICBpZiAoZWRnZSAhPT0gMCkge1xuICAgIGNvbnN0IGVsYXBzZWQgPSBNYXRoLm1heCgwLCB0aW1lIC0gZGVsYXkpO1xuICAgIGNvbnN0IG1pbkVkZ2UgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihlZGdlLCBkdXJhdGlvbikpO1xuICAgIGNvbnN0IGVuZCA9IE1hdGgubWF4KDAsIGR1cmF0aW9uIC0gZWRnZSk7XG4gICAgaWYgKGVsYXBzZWQgPD0gbWluRWRnZSkgeyAvLyBBbmltYXRpbmcgaW5cbiAgICAgIHQgPSBNYXRoLm1pbigxLCBlbGFwc2VkIC8gbWluRWRnZSk7XG4gICAgICBpZiAoaXNFYXNlRGVmKSBjdXJFYXNlID0gY3VyRWFzZS5pbiB8fCAnbGluZWFyJztcbiAgICB9IGVsc2UgaWYgKGVkZ2UgPCBkdXJhdGlvbiAmJiBlbGFwc2VkID4gZW5kKSB7IC8vIEFuaW1hdGluZyBvdXRcbiAgICAgIHQgPSBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCBlbGFwc2VkIC0gZW5kKSAvIGVkZ2UpO1xuICAgICAgZmxpcCA9IHRydWU7XG4gICAgICBpZiAoaXNFYXNlRGVmKSB7XG4gICAgICAgIGN1ckVhc2UgPSBjdXJFYXNlLm91dCB8fCAnbGluZWFyJztcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBJbiBtaWRkbGVcbiAgICAgIHQgPSAxO1xuICAgICAgaWYgKGlzRWFzZURlZikgY3VyRWFzZSA9IGN1ckVhc2UubWlkZGxlIHx8ICdsaW5lYXInO1xuICAgICAgZWxzZSBjdXJFYXNlID0gJ2xpbmVhcic7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHQgPSBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCB0aW1lIC0gZGVsYXkpIC8gZHVyYXRpb24pO1xuICAgIGlmIChpc0Vhc2VEZWYpIGN1ckVhc2UgPSBjdXJFYXNlLmluIHx8ICdsaW5lYXInO1xuICB9XG5cbiAgaWYgKGN1ckVhc2UgJiYgY3VyRWFzZSAhPT0gJ2xpbmVhcicpIHtcbiAgICBpZiAodHlwZW9mIGN1ckVhc2UgPT09ICdmdW5jdGlvbicpIHJldHVybiBlYXNlKHQpO1xuICAgIGlmICghKGN1ckVhc2UgaW4gZWFzZXMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIGFuIGVhc2luZyBmdW5jdGlvbiBieSB0aGUgbmFtZSBvZiAke2N1ckVhc2V9YCk7XG4gICAgfVxuICAgIHQgPSBlYXNlc1tjdXJFYXNlXSh0KTtcbiAgICBpZiAoZmxpcCkgdCA9IDEgLSB0O1xuICB9XG4gIHJldHVybiBsZXJwKGZyb20sIHRvLCB0KTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHR3ZWVuO1xuIl0sIm5hbWVzIjpbImNvbnN0IiwibGV0Il0sIm1hcHBpbmdzIjoiQUFBQUEsR0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0JBLEdBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUU3QkEsR0FBSyxDQUFDLEtBQUssWUFBRyxDQUFDLEtBQVUsRUFBRSxBQUFHOytCQUFWLEdBQUc7QUFBUTtFQUM3QixxREFDUzt1REFDQTsrQ0FDRjt1RUFDTTsyREFDSDt1REFDRDt1REFDQSxRQUFRLENBQ1A7O0VBRVYsSUFBSSxRQUFRLEtBQUssQ0FBQyxJQUFFLE9BQU8sQ0FBQyxHQUFDOztFQUU3QkMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7RUFFTkEsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7RUFDbkJBLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0VBQ2pCQSxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztFQUUzRSxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7SUFDZEQsR0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDMUNBLEdBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN0REEsR0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDekMsSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFO01BQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUM7TUFDbkMsSUFBSSxTQUFTLElBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxFQUFFLElBQUksUUFBUSxHQUFDO0tBQ2pELE1BQU0sSUFBSSxJQUFJLEdBQUcsUUFBUSxJQUFJLE9BQU8sR0FBRyxHQUFHLEVBQUU7TUFDM0MsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztNQUNuRCxJQUFJLEdBQUcsSUFBSSxDQUFDO01BQ1osSUFBSSxTQUFTLEVBQUU7UUFDYixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUM7T0FDbkM7S0FDRixNQUFNO01BQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNOLElBQUksU0FBUyxJQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLFFBQVEsR0FBQzthQUMvQyxPQUFPLEdBQUcsUUFBUSxHQUFDO0tBQ3pCO0dBQ0YsTUFBTTtJQUNMLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDdEQsSUFBSSxTQUFTLElBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxFQUFFLElBQUksUUFBUSxHQUFDO0dBQ2pEOztFQUVELElBQUksT0FBTyxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7SUFDbkMsSUFBSSxPQUFPLE9BQU8sS0FBSyxVQUFVLElBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxFQUFFO01BQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQWlELE9BQU8sQ0FBRSxDQUFDLENBQUM7S0FDN0U7SUFDRCxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLElBQUksSUFBSSxJQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFDO0dBQ3JCO0VBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUMxQixDQUFDO0FBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7In0=