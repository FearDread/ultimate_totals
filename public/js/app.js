
(function(){
  var $container = $('.page-container');

  (function($) {
    $.fn.bgLoaded = function(custom) {
        var self = this;
        var defaults = {
            afterLoaded: function() {
                this.addClass('bg-loaded');
            }
        };
        var settings = $.extend({}, defaults, custom);

        self.each(function() {
            var $this = $(this),
                bgImgs = window.getComputedStyle($this.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
            $this.data('loaded-count', 0);
            $.each(bgImgs, function(key, value) {
                var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                $('<img/>').attr('src', img).load(function() {
                    $(this).remove(); // prevent memory leaks
                    $this.data('loaded-count', $this.data('loaded-count') + 1);
                    if ($this.data('loaded-count') >= bgImgs.length) {
                        settings.afterLoaded.call($this);
                    }
                });
            });

        });
    };
  })(jQuery);

  function _preload(){
    $('.loader').fadeOut();
    $('.preloader').delay(300).fadeOut('slow');
    $('body').delay(300);
  }

  function _load(){
    setTimeout(function(){
      _preload();

    bind_events();

    $('.single-page').bgLoaded({
      afterLoaded:function(){
        show_caption($('.single-page', $container).eq(0));
      }
    });
    }, 1000);
  }

  function bind_events(){
    $container.scroll(container_scroll);
    $('.page-close', $container).click(close_page);
    $('.page-scroll', $container).click(scroll_top);
    $('.single-page').click(open_page);
  }

  function _unload(){
    console.log('unregister events here if needed.');
    console.log('reset main window');
  }

  function scroll_top(){
    $container.animate({'scrollTop': $(window).height()}, 500);
  }

  function container_scroll(){
    request_anim(change_opacity);
  }

  function request_anim(value){
    return window.requestAnimationFrame(value);
  }

  function close_page(){
    project_toggle($('.is-full-width'), $container, false);
  }

  function open_page(e){
    var $selected = $(this),
        toggle = !$selected.hasClass('is-full-width');

    if(toggle){
      project_toggle($selected, $container, toggle);
    } 
  }

  function project_toggle($project, $container, bool){
    if(bool){
      $container.addClass('project-is-open');
      $project.addClass('is-full-width').siblings('.single-page').removeClass('is-loaded');

    }else{
      var media_query = window.getComputedStyle(document.querySelector('.page-container'), '::before').getPropertyValue('content'),
          delay = (media_query == 'mobile') ? 100 : 0;

      $container.removeClass('project-is-open');

      $project.animate({opacity: 0},800, function(){
        $project.removeClass('is-loaded');
        $container.find('.page-scroll').attr('style', '');

        setTimeout(function(){
          $project.attr('style', '').removeClass('is-full-width').find('.page-title').attr('style', '');
        }, delay);

        setTimeout(function(){
          show_caption($('.page-container .single-page').eq(0));
        }, 300);
      });
    }
  }

  function change_opacity() {
    var newOpacity = 1 - ($('.page-container').scrollTop()) / 300;

    $('.page-container .page-scroll').css('opacity', newOpacity);
    $('.is-full-width .page-title').css('opacity', newOpacity);
  }

  function show_caption($project){
    if($project.length > 0){

      setTimeout(function(){
        $project.addClass('is-loaded');

        show_caption($project.next());
      }, 150);
    }
  }

  _load();
  /*
  return {
    load:_load
  }
  */

}).call(this);
