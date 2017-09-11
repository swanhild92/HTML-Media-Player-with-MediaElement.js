/**
 * Created by Els on 8-9-2017.
 */
(function($) {
    "use strict";

    $('video, audio').mediaelementplayer({
        features: ['playpause', 'volume', 'current', 'progress', 'duration', 'skipback', 'tracks', 'markers', 'contextmenu', 'chromecast', 'fullscreen'],
        skipBackInterval: 10
    });

})(jQuery);
