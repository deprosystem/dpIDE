function ScrollItem(el) {
    this.scrollColor = "";
    this.content = el.parentElement;
    this.viewport = this.content.parentElement;
    let type = this.viewport.android.type;
    
    if (type.indexOf("Scroll") == -1) return;
    
    this.scrollbar;
    el.scroll_y = this;
    if (el.className.indexOf("infoItem") == -1) {
        el.className += " infoItem";
    }
    if (this.content.className.indexOf("contentItem") == -1) {
        this.content.className += " contentItem";
    }
    if (this.viewport.className.indexOf("viewportItem") == -1) {
        this.viewport.className += " viewportItem";
    }
    this.isHide = true;
    this.scrollerHeightMin = 25;
    this.step = 20;
    this.pressed = false;
    this.viewportHeight = this.viewport.offsetHeight;
    this.contentHeight = this.content.scrollHeight;
    this.max = this.viewport.clientHeight - this.contentHeight;
    this.ratio = this.viewportHeight / this.contentHeight;
    this.baseHeight = parseInt(this.ratio * this.viewportHeight);
    
    this.init = function() {
        if (this.viewportHeight > this.contentHeight) return;
        this.createScrollbar();
        this.registerEventsHandler();
    }
    
    this.createScrollbar = function() {
        let scrollbar = document.createElement('div'),
            scroller = document.createElement('div');
        let scrollLine = document.createElement('div');
        scrollbar.className = 'scrollbar_y';
        scroller.className = 'scroller_y';
        scrollLine.className = 'scroll_line_y';
        scrollbar.appendChild(scrollLine);
        scrollbar.appendChild(scroller);
        forScroll.append(scrollbar);
        if (this.scrollColor != "") {
            scroller.style.backgroundColor = this.scrollColor;
            scrollLine.style.backgroundColor = this.scrollColor;
        }
        
        scrollbar.style.top = this.viewport.offsetTop;
        this.scroller = scroller;
        this.scrollbar = scrollbar;
        
        
        this.viewportHeight = this.viewport.offsetHeight;
        this.scrollbar.style.height = this.viewportHeight + px;
        this.contentHeight = this.content.scrollHeight;
        this.max = this.viewport.clientHeight - this.contentHeight;
        this.ratio = this.viewportHeight / this.contentHeight;
        this.baseHeight = parseInt(this.ratio * this.viewportHeight);
        
        this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
        this.scrollerHeight = (this.scrollerHeight < this.scrollerHeightMin) ? this.scrollerHeightMin : this.scrollerHeight;
        if (this.isHide) {
            if (this.viewportHeight > this.scrollerHeight) {
                this.scrollbar.style.display = "block";
            } else {
                this.scrollbar.style.display = "none";
            }
        }
        this.scroller.style.height = this.scrollerHeight + 'px';
        this.scrollerMaxOffset = this.viewportHeight - this.scroller.offsetHeight;
    };
    
    this.registerEventsHandler = function(e) {
        this.viewport.addEventListener('wheel', () => {this.scroll(event)});
        this.content.addEventListener('scroll', () => {
                this.scroller.style.top = (this.content.scrollTop * this.ratio) + 'px';
        });
        this.scroller.addEventListener('mousedown', e => {
                // координата по оси Y нажатия левой кнопки мыши
                this.start = e.clientY;
                // устанавливаем флаг, информирующий о нажатии левой кнопки мыши
                this.pressed = true;
        });
        document.addEventListener('mousemove', this.drop.bind(this));
        document.addEventListener('mouseup', () => this.pressed = false);
    };
    
    this.setScrollColor = function (color) {
        this.scrollColor = color;
    }
    
    this.setScrollHide = function(hide) {
        this.isHide = hide;
    }

    this.resize = function(e) {
        this.viewportHeight = this.viewport.offsetHeight;
        this.scrollbar.style.top = this.viewport.offsetTop + "px";
        this.scrollbar.style.height = this.viewportHeight + "px";
        this.contentHeight = this.content.scrollHeight;
        this.max = this.viewport.clientHeight - this.contentHeight;
        this.ratio = this.viewportHeight / this.contentHeight;
        this.baseHeight = parseInt(this.ratio * this.viewportHeight);
        this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
        this.scrollerHeight = (this.scrollerHeight < this.scrollerHeightMin) ? this.scrollerHeightMin : this.scrollerHeight;
        this.scroller.style.height = this.scrollerHeight + 'px';
        if (this.isHide) {
            if (this.viewportHeight > this.scrollerHeight) {
                this.scrollbar.style.display = "block";
            } else {
                this.scrollbar.style.display = "none";
            }
        }
        this.scrollerMaxOffset = this.viewportHeight - this.scroller.offsetHeight;
    }

    this.scroll = function(e) {
            e.preventDefault();
            let dir = -Math.sign(e.deltaY);
            let	step = (Math.abs(e.deltaY) >= 3) ? this.step * dir : 0;
            this.content.style.top = (this.content.offsetTop + step) + 'px';
            if (this.content.offsetTop > 0) this.content.style.top = '0px';
            if (this.content.offsetTop < this.max) this.content.style.top = this.max + 'px';
            this.scroller.style.top = (-this.content.offsetTop * this.ratio) + 'px';
    };

    this.drop = function(e) {
            e.preventDefault();
            if (this.pressed === false) return;
            let shiftScroller = this.start - e.clientY;
            this.scroller.style.top = (this.scroller.offsetTop - shiftScroller) + 'px';
            if (this.scroller.offsetTop <= 0) this.scroller.style.top = '0px';
            let	totalHeight = this.scroller.offsetHeight + this.scroller.offsetTop;
            if (totalHeight >= this.viewportHeight) this.scroller.style.top = this.scrollerMaxOffset + 'px';

            let	shiftContent = this.scroller.offsetTop / this.ratio;
//            this.content.scrollTo(this.content.scrollLeft, shiftContent);
//            this.content.scrollTo(0, shiftContent);
            this.content.style.top = -shiftContent + 'px';
/*
            if (this.nameEvent === 'wheel') {
                    this.content.style.top = -shiftContent + 'px';
            } else {
                    this.content.scrollTo(0, shiftContent);
            }
*/
            this.start = e.clientY;
    };
    
    this.init();
}

