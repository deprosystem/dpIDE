(function() {
	'use strict';
// container и все его родители не должен иметь display:none
	function ScrollBox(container, nameEvent) {
		this.nameEvent = nameEvent;
		this.viewport = container;
                this.colorScroll = container.getAttribute('data-colorscr');
                container.scroll_y = this;
		this.content = this.viewport.querySelector('.content');
		this.viewportHeight = this.viewport.offsetHeight;
		this.contentHeight = this.content.scrollHeight;
		this.max = this.viewport.clientHeight - this.contentHeight;
                this.ratio = this.viewportHeight / this.contentHeight;
		this.scrollerHeightMin = 25;
		this.step = 20;
		this.pressed = false;
	}

	const fn = ScrollBox.prototype;

	fn.init = function() {
		if (this.viewportHeight > this.contentHeight) return;
		this.createScrollbar();
		this.registerEventsHandler();
	};

	fn.createScrollbar = function() {
		let scrollbar = document.createElement('div'),
			scroller = document.createElement('div');
                let scrollLine = document.createElement('div');
		scrollbar.className = 'scrollbar';
		scroller.className = 'scroller';
                scrollLine.className = 'scroll_line';
                if (this.colorScroll != null) {
                    scroller.style.backgroundColor = this.colorScroll;
                    scrollLine.style.backgroundColor = this.colorScroll;
                }
                scrollbar.appendChild(scrollLine);
		scrollbar.appendChild(scroller);
		this.viewport.appendChild(scrollbar);

		this.scroller = this.viewport.querySelector('.scroller');
		this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
		this.scrollerHeight = (this.scrollerHeight < this.scrollerHeightMin) ? this.scrollerHeightMin : this.scrollerHeight;
		this.scroller.style.height = this.scrollerHeight + 'px';
		this.scrollerMaxOffset = this.viewportHeight - this.scroller.offsetHeight;
	};

	fn.registerEventsHandler = function(e) {
		if (this.nameEvent === 'wheel') {
			this.viewport.addEventListener('wheel', this.scroll.bind(this));
		} else {
			this.content.addEventListener('scroll', () => {
				this.scroller.style.top = (this.content.scrollTop * this.ratio) + 'px';
			});
		}

		this.scroller.addEventListener('mousedown', e => {
			// координата по оси Y нажатия левой кнопки мыши
			this.start = e.clientY;
			// устанавливаем флаг, информирующий о нажатии левой кнопки мыши
			this.pressed = true;
		});
		document.addEventListener('mousemove', this.drop.bind(this));
		document.addEventListener('mouseup', () => this.pressed = false);
	};

        fn.resize = function(e) {
            this.viewportHeight = this.viewport.offsetHeight;
            this.contentHeight = this.content.scrollHeight;
            this.max = this.viewport.clientHeight - this.contentHeight;
            this.ratio = this.viewportHeight / this.contentHeight;

            this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
            this.scrollerHeight = (this.scrollerHeight < this.scrollerHeightMin) ? this.scrollerHeightMin : this.scrollerHeight;
            this.scroller.style.height = this.scrollerHeight + 'px';
            this.scrollerMaxOffset = this.viewportHeight - this.scroller.offsetHeight;
        }

	fn.scroll = function(e) {
		e.preventDefault();
		let dir = -Math.sign(e.deltaY);
		let	step = (Math.abs(e.deltaY) >= 3) ? this.step * dir : 0;
		this.content.style.top = (this.content.offsetTop + step) + 'px';
		if (this.content.offsetTop > 0) this.content.style.top = '0px';
		if (this.content.offsetTop < this.max) this.content.style.top = this.max + 'px';
		this.scroller.style.top = (-this.content.offsetTop * this.ratio) + 'px';
	};

	fn.drop = function(e) {
		e.preventDefault();
		if (this.pressed === false) return;
		let shiftScroller = this.start - e.clientY;
		this.scroller.style.top = (this.scroller.offsetTop - shiftScroller) + 'px';
		if (this.scroller.offsetTop <= 0) this.scroller.style.top = '0px';
		let	totalHeight = this.scroller.offsetHeight + this.scroller.offsetTop;
		if (totalHeight >= this.viewportHeight) this.scroller.style.top = this.scrollerMaxOffset + 'px';

		let	shiftContent = this.scroller.offsetTop / this.ratio;
		if (this.nameEvent === 'wheel') {
			this.content.style.top = -shiftContent + 'px';
		} else {
			this.content.scrollTo(0, shiftContent);
		}
		this.start = e.clientY;
	};

	// выбираем все блоки на странице, в которых может понадобиться
	// прокрутка контента
	const containers = document.querySelectorAll('[data-control]');
	for (const container of containers) {
		let nameEvent = container.getAttribute('data-control');
		let scrollbox = new ScrollBox(container, nameEvent);
		scrollbox.init();
	}
})();