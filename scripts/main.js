/**
 * Created by Els on 8-9-2017.
 */
(function($) {
    "use strict";

    $('video, audio').mediaelementplayer({
        features: ['chromecast', 'playpause', 'progress', 'skipback', 'tracks'],
        startLanguage: 'en',
        skipBackInterval: 10
    });

})(jQuery);
