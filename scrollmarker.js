/*!
 * Scrollmarker - continue where you left
 *
 * Copyright 2013, Bytelogic
 * Released under the MIT license
 *
 * Date: 2013-04-22
 * Author: Dirk Bonhomme <dirk@bytelogic.be>
 */
window.scrollmarker = (function(){

    /**
     * Gather or generate id of elements to monitor
     */
    var targets = [];
    var targetsLength;
    var collectTargets = function(selector){
        var elements = document.querySelectorAll(selector);
        for(var i = 0, l = elements.length; i < l; i++){
            targets.push({
                element: elements[i],
                id: generateId(elements[i])
            });
        }
        targetsLength = targets.length;
    };

    /**
     * Calculate offset for each monitored element
     */
    var calculateOffsets = function(){
        var scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
        var clientTop = document.documentElement.clientTop || 0;
        for(var i = 0; i < targetsLength; i++){
            targets[i].offset = targets[i].element.getBoundingClientRect().top + scrollOffset - clientTop;
        }

        targets.sort(function(target1, target2){
            return target1.offset - target2.offset;
        });
    };

    /**
     * Force browser to scroll to current hash
     * Required when opening hash to generated id
     */
    var scrollToTarget = function(){
        window.location.hash = window.location.hash;
    };

    /**
     * Fetch an element's id or generate one based on text content
     */
    var uniqueId = 1;
    var generateId = function(element){
        var id = element.id;
        if(id)return id;
        id = (element.textContent || element.title || element.alt || 'scrollmarker')
            .toLowerCase()
            .replace(/[^\w ]+/g, '') // filter non-alphanumeric
            .replace(/ +/g,'-') // condense consecutive spaces
            .substr(0, 50); // limit length
        id += '-' + uniqueId++;
        element.id = id;
        return id;
    };

    /**
     * Handle scroll event. Throttle to 1 / 300ms
     */
    var handleScrollThrottled = (function(){
        var timeout;
        var later = function(){
            timeout = null;
            setHash();
        };
        return function(){
            if(timeout) return;
            setHash();
            timeout = setTimeout(later, 300);
        };
    })();

    /**
     * Set hash depending on scroll position
     */
    var setHash = function(){
        var pageYOffset = window.pageYOffset;
        var hash = 'top';
        for(var i = 0; i < targetsLength; i++){
            if(targets[i].offset > pageYOffset){
                if(i) hash = targets[i-1].id;
                window.history.replaceState(null, null, '#' + hash);
                break;
            }
        }
    };

    /**
     * Return public interface
     */
    return function(selector){
        if(!(window.history.replaceState)) return; // unsupported browser
        collectTargets(selector);
        scrollToTarget();
        document.addEventListener('scroll', handleScrollThrottled);
        window.addEventListener('load', calculateOffsets);
    };

})();