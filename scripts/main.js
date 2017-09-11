/**
 * Created by Els on 8-9-2017.
 */
(function($) {
    "use strict";

    $('video').mediaelementplayer({
        features: ['playpause', 'volume', 'current', 'progress', 'duration', 'skipback', 'tracks', 'markers', 'chromecast', 'fullscreen'],
        skipBackInterval: 10
    });

    $('audio').mediaelementplayer({
        features: ['playpause', 'current', 'progress', 'duration', 'tracks']
    });

})(jQuery);
