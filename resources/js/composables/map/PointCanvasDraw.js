import { ref, watchEffect } from 'vue';

function googleMapsAPILoaded() {
    return typeof google === 'object' && typeof google.maps === 'object';
}

export function createCanvasOverlay() {
    if (!googleMapsAPILoaded()) {
        console.error("Google Maps API is not loaded.");
        return;
    }
  
    return class CanvasOverlay extends google.maps.OverlayView {
        constructor(points, onDraw) {
            super();
            this.points = points;
            this.onDraw = onDraw;
        }
  
        onAdd() {
            this.canvas = document.createElement('canvas');
            this.canvas.style.position = 'absolute';
            this.canvas.style.zIndex = "100";
            this.getPanes().overlayLayer.appendChild(this.canvas);
        }
  
        draw() {
            const projection = this.getProjection();
            const swBound = projection.fromLatLngToDivPixel(this.getMap().getBounds().getSouthWest());
            const neBound = projection.fromLatLngToDivPixel(this.getMap().getBounds().getNorthEast());
          
            this.canvas.style.left = swBound.x + 'px';
            this.canvas.style.top = neBound.y + 'px';
            this.canvas.width = Math.abs(neBound.x - swBound.x);
            this.canvas.height = Math.abs(swBound.y - neBound.y);
          
            if (this.onDraw) {
              this.onDraw(this.canvas, this.points, projection);
            }
        }
  
        onRemove() {
            if (this.canvas) {
                this.canvas.parentNode.removeChild(this.canvas);
                this.canvas = null;
            }
        }
    };
}