export interface CustomArrowProps {
    className?: string;
    style?: any;
    onClick?: any;
    currentSlide?: number;
    slideCount?: number;
}

export interface ResponsiveObject {
    breakpoint: number;
    settings: "unslick" | Settings;
}

export type SwipeDirection = "left" | "down" | "right" | "up" | string;

export type LazyLoadTypes = "ondemand" | "progressive";

export interface Settings {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    afterChange?(currentSlide: number): void;
    appendDots?: any;
    arrows?: boolean;
    asNavFor?: any;
    autoplaySpeed?: number;
    autoplay?: boolean;
    beforeChange?(currentSlide: number, nextSlide: number): void;
    centerMode?: boolean;
    centerPadding?: string;
    className?: string;
    cssEase?: string;
    customPaging?(index: number): any;
    dotsClass?: string;
    dots?: boolean;
    draggable?: boolean;
    easing?: string;
    edgeFriction?: number;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: LazyLoadTypes;
    nextArrow?: any;
    onEdge?(swipeDirection: SwipeDirection): void;
    onInit?(): void;
    onLazyLoad?(slidesToLoad: number[]): void;
    onReInit?(): void;
    onSwipe?(swipeDirection: SwipeDirection): void;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    prevArrow?: any;
    responsive?: ResponsiveObject[];
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipeToSlide?: boolean;
    swipe?: boolean;
    swipeEvent?(swipeDirection: SwipeDirection): void;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    waitForAnimate?: boolean;
}
