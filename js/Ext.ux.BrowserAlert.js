Ext.ns('Ext.ux');

/**
 * @class Ext.ux.BrowserAlert
 * @extends Ext.util.Observable
 *
 * <p><img src="resources/images/Ext.ux.BrowserAlert.jpg" /></p>
 *
 * A simple browser compatibility checker. Following values can be passed to the good or bad config options:<br/>
 *
 * <pre>
Browser				Value
-------------------		------------------
Google Chrome			chrome
Mozilla Firefox			firefox
Mozilla Firefox 2.x		firefox2
Mozilla Firefox 3.x		firefox3
Internet Explorer		ie
Internet Explorer 6		ie6
Internet Explorer 7		ie7
Internet Explorer 8		ie8
Opera				opera
Safari				safari
Safari 2.x			safari2
Safari 3.x			safari3
Safari 4.x			safari4
 * </pre>			
 *
 * @author aR Talat
 * @version 0.1.1
 */

Ext.ux.BrowserAlert = Ext.extend(Ext.util.Observable, {
	
	/**
     * @cfg String heading
     * Header of the alert box. Defaults to: 'News Flash!'
     */
	heading: 'News Flash!',
	
	/**
     * @cfg String badMessage
     * This is pretty much the paragraph that gives the bad news. Defaults to: 'Your browser is LAME! And it makes my website look ugly too.'
     */
	badMessage: 'Your browser is LAME! And it makes my website look ugly too.',
	
	/**
     * @cfg String goodMessage
     * The text of the paragraph that gives hope. Defaults to: 'Try one of these awesome browsers instead:'
     */	 
	goodMessage: 'Try one of these awesome browsers instead:',
	
	/**
     * @cfg Array good
     * This is an array of strings that contains the names of the allowed browsers. 
	 * If this isnt specified then all browsers are considered to be good if they're not in the bad list/array.
     */	 
	good: undefined,
	
	/**
     * @cfg Array bad
     * This is an array of strings that contains the names of the disallowed browsers. 
     */	 
	bad: [],
	
	/**
     * @cfg String applyTo
     * ID of the html element in which the alert will be displayed. The alert element will be the first child of the given element.
	 * Defaults to document.body
     */	 
	applyTo: document.body,
	
	/**
     * @cfg Boolean showLinks
     * Shows the links (icons) to the websites of the good browsers. Defaults to true.
     */	 
	showLinks: true,
	
	
	constructor: function(config) 
	{
		config = config || {};
		Ext.apply(this, config);
		
		Ext.ux.BrowserAlert.superclass.constructor.call(this, config);
		
		if(this.isBad())
		{
			this.show();
		}
    },
	
	// private
	show: function()
	{
		var chromeLink = '<a href="http://www.google.com/chrome" target="_blank"><img src="images/chrome.png" alt="Google Chrome" title="Google Chrome"></a>';
		var firefoxLink = '<a href="http://www.mozilla.com/firefox/" target="_blank"><img src="images/firefox.png" alt="Mozilla FireFox" title="Mozilla FireFox"></a>';
		var ieLink = '<a href="http://www.microsoft.com/windows/internet-explorer/default.aspx" target="_blank"><img src="images/ie.png" alt="Internet Explorer" title="Internet Explorer"></a>';
		var operaLink = '<a href="http://www.opera.com/" target="_blank"><img src="images/opera.png" alt="Opera" title="Opera"></a>';
		var safariLink = '<a href="http://www.apple.com/safari/download/" target="_blank"><img src="images/safari.png" alt="Safari" title="Safari"></a>';		
		
		
		var html = '<div id="browser-alert" class="browser-alert"><div class="close-button">[ close ]</div>';
		
		if (this.heading) { html += '<h1>' + this.heading + '</h1>'; }
		
		if (this.badMessage) { html += '<p class="bad-message">' + this.badMessage + '</p>'; }
		
		if (this.goodMessage) { html += '<p class="good-message">' + this.goodMessage + '</p>'; }
		
		if (this.showLinks) 
		{ 
			html += '<p class="icons">';
			
			if (this.good === undefined)
			{
				if (!this.searchArray(this.bad, 'chrome')) {html += chromeLink;}
				if (!this.searchArray(this.bad, 'firefox') && !this.searchArray(this.bad, 'firefox2')&& !this.searchArray(this.bad, 'firefox3')) {html += firefoxLink;}
				if (!this.searchArray(this.bad, 'ie')&& !this.searchArray(this.bad, 'ie6')&& !this.searchArray(this.bad, 'ie7')&& !this.searchArray(this.bad, 'ie8')) {html += ieLink;}
				if (!this.searchArray(this.bad, 'opera')) {html += operaLink;}
				if (!this.searchArray(this.bad, 'safari')&& !this.searchArray(this.bad, 'safari2')&& !this.searchArray(this.bad, 'safari3')&& !this.searchArray(this.bad, 'safari4')) {html += safariLink;}
			}
			else
			{
				if (this.searchArray(this.good, 'chrome')) {html += chromeLink;}
				if (this.searchArray(this.good, 'firefox')||this.searchArray(this.good, 'firefox2')||this.searchArray(this.good, 'firefox3')) {html += firefoxLink;}
				if (this.searchArray(this.good, 'ie')||this.searchArray(this.good, 'ie6')||this.searchArray(this.good, 'ie7')||this.searchArray(this.good, 'ie8')) {html += ieLink;}
				if (this.searchArray(this.good, 'opera')) {html += operaLink;}
				if (this.searchArray(this.good, 'safari')||this.searchArray(this.good, 'safari2')||this.searchArray(this.good, 'safari3')||this.searchArray(this.good, 'safari4')) {html += safariLink;}
			}
			
			html += '</p>'; 
		}
	
		html += '</div>';		
		
		var dh = Ext.DomHelper;
		var main;
		
		if (this.applyTo === undefined)
		{
			main = Ext.get(document.body);
		}
		else
		{
			main = Ext.get(this.applyTo);
		}
		
		var browserAlert = Ext.get(dh.insertFirst(main, {tag: 'div', html:html}));
		
		//
		
		var closeBtn = Ext.get(Ext.query('#browser-alert .close-button')[0]);
		
		if(!Ext.isIE6&&!Ext.isIE7)
		{
			browserAlert.slideIn();
		}
		
		closeBtn.on('click', function(){browserAlert.slideOut('t', {
			remove: true
		})});		
	},
	
	// private
	searchArray: function(arr, value)
	{
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i]==value) {return true;}
		}
		
		return false;
	},
	
	/**
     * Checks if the current browser is bad.
     */
	isBad: function()
	{
		if ((this.searchArray(this.bad, 'chrome') && Ext.isChrome)||
			(this.searchArray(this.bad, 'firefox') && Ext.isGecko)||
			(this.searchArray(this.bad, 'firefox2') && Ext.isGecko2)||
			(this.searchArray(this.bad, 'firefox3') && Ext.isGecko3)||
			(this.searchArray(this.bad, 'ie') && Ext.isIE)||
			(this.searchArray(this.bad, 'ie6') && Ext.isIE6)||
			(this.searchArray(this.bad, 'ie7') && Ext.isIE7)||
			(this.searchArray(this.bad, 'ie8') && Ext.isIE8)||
			(this.searchArray(this.bad, 'opera') && Ext.isOpera)||
			(this.searchArray(this.bad, 'safari') && Ext.isSafari)||
			(this.searchArray(this.bad, 'safari2') && Ext.isSafari2)||
			(this.searchArray(this.bad, 'safari3') && Ext.isSafari3)||
			(this.searchArray(this.bad, 'safari4') && Ext.isSafari4))
		{
			return true;
		}
		
		return false;
	}
});