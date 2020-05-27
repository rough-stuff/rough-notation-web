import { SVG_NS, DEFAULT_ANIMATION_DURATION } from './model.js';
import { renderAnnotation } from './render.js';
import { ensureKeyframes } from './keyframes.js';
class RoughAnnotationImpl {
    constructor(e, config) {
        this._state = 'unattached';
        this._resizing = false;
        this._animationGroupDelay = 0;
        this._resizeListener = () => {
            if (!this._resizing) {
                this._resizing = true;
                setTimeout(() => {
                    this._resizing = false;
                    if (this._state === 'showing') {
                        const newSize = this.computeSize();
                        if (newSize && this.hasRectChanged(newSize)) {
                            this.show();
                        }
                    }
                }, 400);
            }
        };
        this._e = e;
        this._config = config;
        this.attach();
    }
    get config() {
        return this._config;
    }
    attach() {
        if (this._state === 'unattached' && this._e.parentElement) {
            ensureKeyframes();
            const svg = this._svg = document.createElementNS(SVG_NS, 'svg');
            const style = svg.style;
            style.position = 'absolute';
            style.top = '0';
            style.left = '0';
            style.overflow = 'visible';
            style.pointerEvents = 'none';
            style.width = '100px';
            style.height = '100px';
            const prepend = this._config.type === 'highlight';
            this._e.insertAdjacentElement(prepend ? 'beforebegin' : 'afterend', svg);
            this._state = 'not-showing';
            // ensure e is positioned
            if (prepend) {
                const computedPos = window.getComputedStyle(this._e).position;
                const unpositioned = (!computedPos) || (computedPos === 'static');
                if (unpositioned) {
                    this._e.style.position = 'relative';
                }
            }
            this.attachListeners();
        }
    }
    detachListeners() {
        window.removeEventListener('resize', this._resizeListener);
        if (this._resizeObserver) {
            this._resizeObserver.unobserve(this._e);
        }
    }
    attachListeners() {
        this.detachListeners();
        window.addEventListener('resize', this._resizeListener, { passive: true });
        if ((!this._resizeObserver) && ('ResizeObserver' in window)) {
            this._resizeObserver = new window.ResizeObserver((entries) => {
                for (const entry of entries) {
                    let trigger = true;
                    if (entry.contentRect) {
                        const newRect = this.computeSizeWithBounds(entry.contentRect);
                        if (newRect && (!this.hasRectChanged(newRect))) {
                            trigger = false;
                        }
                    }
                    if (trigger) {
                        this._resizeListener();
                    }
                }
            });
        }
        if (this._resizeObserver) {
            this._resizeObserver.observe(this._e);
        }
    }
    sameInteger(a, b) {
        return Math.round(a) === Math.round(b);
    }
    hasRectChanged(rect) {
        if (this._lastSize && rect) {
            return !(this.sameInteger(rect.x, this._lastSize.x) &&
                this.sameInteger(rect.y, this._lastSize.y) &&
                this.sameInteger(rect.w, this._lastSize.w) &&
                this.sameInteger(rect.h, this._lastSize.h));
        }
        return true;
    }
    isShowing() {
        return (this._state !== 'not-showing');
    }
    show() {
        switch (this._state) {
            case 'unattached':
                break;
            case 'showing':
                this.hide();
                this.show();
                break;
            case 'not-showing':
                this.attach();
                if (this._svg) {
                    this.render(this._svg);
                }
                break;
        }
    }
    hide() {
        if (this._svg) {
            while (this._svg.lastChild) {
                this._svg.removeChild(this._svg.lastChild);
            }
        }
        this._state = 'not-showing';
    }
    remove() {
        if (this._svg && this._svg.parentElement) {
            this._svg.parentElement.removeChild(this._svg);
        }
        this._svg = undefined;
        this._state = 'unattached';
        this.detachListeners();
    }
    render(svg) {
        const rect = this.computeSize();
        if (rect) {
            renderAnnotation(svg, rect, this._config, this._animationGroupDelay);
            this._lastSize = rect;
            this._state = 'showing';
        }
    }
    computeSize() {
        return this.computeSizeWithBounds(this._e.getBoundingClientRect());
    }
    computeSizeWithBounds(bounds) {
        if (this._svg) {
            const rect1 = this._svg.getBoundingClientRect();
            const rect2 = bounds;
            const x = (rect2.x || rect2.left) - (rect1.x || rect1.left);
            const y = (rect2.y || rect2.top) - (rect1.y || rect1.top);
            const w = rect2.width;
            const h = rect2.height;
            return { x, y, w, h };
        }
        return null;
    }
}
export function annotate(element, config) {
    return new RoughAnnotationImpl(element, config);
}
export function annotationGroup(annotations) {
    let delay = 0;
    for (const a of annotations) {
        const ai = a;
        ai._animationGroupDelay = delay;
        const duration = ai.config.animationDuration === 0 ? 0 : (ai.config.animationDuration || DEFAULT_ANIMATION_DURATION);
        delay += duration;
    }
    const list = [...annotations];
    return {
        show() {
            for (const a of list) {
                a.show();
            }
        },
        hide() {
            for (const a of list) {
                a.hide();
            }
        }
    };
}
