(function ($) {
    // transition兼容 transition.js
    var transition = window.mt.transition;
    console.log(transition.end);
    // 提取init公共部分
    function init($elem, hiddenCallback) {
        if ($elem.is(':hidden')) {
            $elem.data('status', 'hidden');
            if (typeof hiddenCallback === 'function')
                hiddenCallback();
        } else {
            $elem.data('status', 'shown');
        }
    }
    // 提取show公共部分
    function show($elem, callback) {
        if ($elem.data('status') === 'show') return;
        if ($elem.data('status') === 'shown') return;
        $elem.data('status', 'show').trigger('show');
        callback();
    }

    function hide($elem, callback) {
        if ($elem.data('status') === 'hide') return;
        if ($elem.data('status') === 'hidden') return;
        $elem.data('status', 'hide').trigger('hide');
        callback();
    }
    // 正常显示
    var silent = {
        // init: function ($elem) {
        //     if ($elem.is(':hidden')) {
        //         $elem.data('status', 'hidden');
        //     } else {
        //         $elem.data('status', 'shown');
        //     }
        // },
        // show: function ($elem) {
        //     if ($elem.data('status') === 'show') return;
        //     if ($elem.data('status') === 'shown') return;
        //     $elem.data('status', 'show').trigger('show');
        //     $elem.show();
        //     $elem.data('status', 'shown').trigger('shown');
        // },
        // hide: function ($elem) {
        //     if ($elem.data('status') === 'hide') return;
        //     if ($elem.data('status') === 'hidden') return;
        //     $elem.data('status', 'hide').trigger('hide');
        //     $elem.hide();
        //     $elem.data('status', 'hidden').trigger('hidden');
        // }
        init: init,
        show: function ($elem) {
            show($elem, function () {
                $elem.show();
                $elem.data('status', 'shown').trigger('shown');
            });
        },
        hide: function ($elem) {
            hide($elem, function () {
                $elem.hide();
                $elem.data('status', 'hidden').trigger('hidden');
            });
        }


    };
    // css3实现
    var css3 = {

        fade: {
            // init: function ($elem) {
            //     $elem.addClass('transition');
            //     if ($elem.is(':hidden')) {
            //         $elem.data('status', 'hidden');
            //     } else {
            //         $elem.data('status', 'hidden');
            //     }
            // },
            // show: function ($elem) {
            //     if ($elem.data('status') === 'show') return;
            //     if ($elem.data('status') === 'shown') return;
            //     $elem.data('status','show').trigger('show');
            //     $elem.off('transitionend').one('transitionend', function () {
            //         $elem.data('status','shown').trigger('shown');
            //         // console.log(1);
            //     });
            //     $elem.show();

            //     setTimeout(function () {
            //         $elem.removeClass('fadeOut');
            //     }, 20);
            // },
            // hide: function ($elem) {
            //     if ($elem.data('status') === 'hide') return;
            //     if ($elem.data('status') === 'hidden') return;
            //     $elem.data('status','hide').trigger('hide');
            //     $elem.off('transitionend').one('transitionend', function () {

            //         $elem.hide();
            //         $elem.data('status','hidden').trigger('hidden');
            //     });
            //     $elem.addClass('fadeOut');
            // }
            init: function ($elem) {
                $elem.addClass('transition');
                init($elem, function () {
                    $elem.addClass('fadeOut');
                });
            },
            show: function ($elem) {
                show($elem, function () {
                    $elem.off('transition.end').one('transition.end', function () {
                        $elem.data('status', 'shown').trigger('shown');
                    });
                    $elem.show();
                    setTimeout(function () {
                        $elem.removeClass('fadeOut');
                    }, 20);
                });
            },
            hide: function ($elem) {
                hide($elem, function () {
                    $elem.off('transition.end').one('transition.end', function () {
                        $elem.data('status', 'hidden').trigger('hidden');
                        $elem.hide();
                    });
                   
                    setTimeout(function () {
                        $elem.addClass('fadeOut');
                    }, 20);
                });
            }

        },
        slideUpDown: {
            init: function ($elem) {
                $elem.height($elem.height());
                css3._init($elem, 'slideUpDownCollapse');
            },
            show: function ($elem) {
                // $elem.height($elem.height());
                console.log(1);
                css3._show($elem, 'slideUpDownCollapse');
            },
            hide: function ($elem) {
                css3._hide($elem, 'slideUpDownCollapse');
            }
        },
        slideLeftRight: {
            init: function ($elem) {
                $elem.width($elem.width());
                css3._init($elem, 'slideLeftRightCollapse');
            },
            show: function ($elem) {
                css3._show($elem, 'slideLeftRightCollapse');
            },
            hide: function ($elem) {
                css3._hide($elem, 'slideLeftRightCollapse');
            }
        },
        fadeslideUpDown: {
            init: function ($elem) {
                $elem.height($elem.height());
                css3._init($elem, 'fadeOut slideUpDownCollapse');
            },
            show: function ($elem) {
                css3._show($elem, 'fadeOut slideUpDownCollapse');
            },
            hide: function ($elem) {
                css3._hide($elem, 'fadeOut slideUpDownCollapse');
            }
        },
        fadeslideLeftRight: {
            init: function ($elem) {
                $elem.width($elem.width());
                css3._init($elem, 'fadeOut slideLeftRightCollapse');
            },
            show: function ($elem) {
                css3._show($elem, 'fadeOut slideLeftRightCollapse');
            },
            hide: function ($elem) {
                css3._hide($elem, 'fadeOut slideLeftRightCollapse');
            }
        },
    };
    css3._init = function ($elem, className) {
        $elem.addClass('transition');
        init($elem, function () {
            $elem.addClass(className);
        });
    };
    css3._show = function ($elem, className) {
        show($elem, function () {
            $elem.off('transition.end').one('transition.end', function () {
                $elem.data('status', 'shown').trigger('shown');
            });
            $elem.show();
            setTimeout(function () {
                $elem.removeClass(className);
            }, 20);

        });
    };
    css3._hide = function ($elem, className) {
        hide($elem, function () {
            $elem.off('transition.end').one('transition.end', function (){
                $elem.data('status', 'hidden').trigger('hidden');
                $elem.hide();
            });


            $elem.addClass(className);

        });
    };
    // js实现
    var js = {
        fade: {
            init: function ($elem) {
                js._init($elem);
            },
            show: function ($elem) {
                js._show($elem, 'fadeIn');
            },
            hide: function ($elem) {
                js._hide($elem, 'fadeOut');
            }
        },
        slideUpDown: {
            init: function ($elem) {
                js._init($elem);
            },
            show: function ($elem) {
                js._show($elem, 'slideDown');
            },
            hide: function ($elem) {
                js._hide($elem, 'slideUp');
            }
        },
        slideLeftRight: {
            init: function ($elem) {
                var styles = {};
                styles['width'] = $elem.css('width');
                styles['padding-left'] = $elem.css('padding-left');
                styles['padding-right'] = $elem.css('padding-right');
                $elem.data('styles', styles);
                $elem.removeClass('transition');
                init($elem, function () {
                    $elem.css({
                        'width': 0,
                        'padding-left': 0,
                        'padding-right': 0,

                    });
                });
            },
            show: function ($elem) {
                var styles = $elem.data('styles');
                show($elem, function () {
                    $elem.show();
                    $elem.stop().animate({
                        'width': styles['width'],
                        'padding-left': styles['padding-left'],
                        'padding-right': styles['padding-right']
                    }, function () {
                        $elem.data('status', 'shown').trigger('shown');
                    });
                });
            },
            hide: function ($elem) {
                hide($elem, function () {
                    $elem.stop().animate({
                        'width': 0,
                        'padding-left': 0,
                        'padding-right': 0
                    }, function () {
                        $elem.hide();
                        $elem.data('status', 'hidden').trigger('hidden');
                    });
                });
            }
        },
        fadeslideUpDown: {
            // init: function ($elem) {
            //     var styles = {};
            //     styles['height'] = $elem.css('height');
            //     styles['padding-top'] = $elem.css('padding-top');
            //     styles['padding-bottom'] = $elem.css('padding-bottom');
            //     styles['opacity'] = $elem.css('opacity');

            //     $elem.data('styles',styles);

            //     $elem.removeClass('transition');
            //     init($elem, function () {
            //         $elem.css({
            //             'height': 0,
            //             'padding-top': 0,
            //             'padding-bottom': 0,
            //             'opacity':0,
            //         });
            //     });
            // },
            // show: function ($elem) {
            //     var styles = $elem.data('styles');
            //     show($elem, function () {
            //         $elem.show();
            //         $elem.stop().animate({
            //             'height': styles['height'],
            //             'padding-top': styles['padding-top'],
            //             'padding-bottom': styles['padding-bottom'],
            //             'opacity': styles['opacity'],

            //         },function () {
            //             $elem.data('status', 'shown').trigger('shown');
            //         });
            //     });
            // },
            // hide: function ($elem) {
            //     hide($elem, function () {
            //         $elem.stop().animate({
            //             'height': 0,
            //             'padding-top': 0,
            //             'padding-bottom': 0,
            //             'opacity':0,
            //         }, function () {
            //             $elem.hide();
            //             $elem.data('status', 'hidden').trigger('hidden');
            //         });
            //     });
            // }
            init: function ($elem) {
                js._customInit($elem, {
                    'opacity': 0,
                    'height': 0,
                    'padding-top': 0,
                    'padding-bottom': 0
                });
            },
            show: function ($elem) {
                js._customShow($elem);
            },
            hide: function ($elem) {
                js._customHide($elem, {
                    'opacity': 0,
                    'height': 0,
                    'padding-top': 0,
                    'padding-bottom': 0
                });
            }
        },
        fadeslideLeftRight: {
            init: function ($elem) {
                js._customInit($elem, {
                    'opacity': 0,
                    'width': 0,
                    'padding-left': 0,
                    'padding-right': 0
                });
            },
            show: function ($elem) {
                js._customShow($elem);
            },
            hide: function ($elem) {
                js._customHide($elem, {
                    'opacity': 0,
                    'width': 0,
                    'padding-left': 0,
                    'padding-right': 0
                });
            }
        },


    };
    js._init = function ($elem) {
        
        $elem.removeClass('transition');
        // js和transition动画冲突，在执行js前，将transition去掉，屏蔽风险
        init($elem);
    };
    js._show = function ($elem, mode1) {

        show($elem, function () {
            $elem.stop()[mode1](function () {
                $elem.data('status', 'shown').trigger('shown');
            });
        });
    };
    js._hide = function ($elem, mode1) {
        hide($elem, function () {
            $elem.stop()[mode1](function () {
                $elem.data('status', 'hidden').trigger('hidden');
            });
        });
    };
    js._customInit = function ($elem, options) {
        var styles = {};
        for (var p in options) {
            styles[p] = $elem.css(p);
        }
        $elem.data('styles', styles);
        js._init($elem, function () {
            $elem.css(options);
        });
    };
    js._customShow = function ($elem) {
        var styles = $elem.data('styles');
        show($elem, function () {
            $elem.show();
            $elem.stop().animate($elem.data('styles'), function () {
                $elem.data('status', 'shown').trigger('shown');
            });
        });
    };
    js._customHide = function ($elem, options) {
        var styles = $elem.data('styles');
        hide($elem, function () {
            $elem.stop().animate(options, function () {
                $elem.hide();
                $elem.data('status', 'hidden').trigger('hidden');
            });
        });
    };

    var defaults={
        css3:true,
        js:true,
        animation:'fade'
    };
    function showHide($elem,options){
        var mode=null;
        options=$.extend({},defaults,options);
        if(options.css3&&transition.isSupport){
            mode=css3[options.animation]||css3[defaults.animation];
        }else if(options.js){
            mode=js[options.animation]||js[defaults.animation];
        }else{
            mode=silent;
        }
        
        mode.init($elem);
        return{
            show:$.proxy(mode.show,this,$elem),
            hide:$.proxy(mode.hide,this,$elem),
        };
    }

    $.fn.extend({
        showHide:function(option){
            return this.each(function(){
                var $this=$(this),
                    options=$.extend({},defaults,typeof option==='object'&&option),
                    mode=$this.data('showHide');
                if(!mode){
                    $this.data('showHide',mode=showHide($this,options));
                }
                if(typeof mode[option]==='function'){
                    mode[option]();
                }
            });

        }
    });
    window.mt=window.mt||{};
    window.mt.showHide=showHide;





})(jQuery);