<template>
    <div class="tradingview-widget-container" style="width: 100%; height: 104px;">
        <iframe scrolling="no" allowtransparency="true" frameborder="0"
            src="https://www.tradingview-widget.com/embed-widget/tickers/?locale=vi_VN#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22title%22%3A%22Ch%E1%BB%89%20s%E1%BB%91%20S%26P%20500%22%7D%2C%7B%22proName%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22title%22%3A%22US%20100%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22Bitcoin%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22%C4%90%E1%BB%93ng%20Ethereum%22%7D%5D%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A104%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22tickers%22%2C%22page-uri%22%3A%22__NHTTP__%22%7D"
            title="tickers TradingView widget" lang="en"
            style="user-select: none; box-sizing: border-box; display: block; height: calc(100% - 32px); width: 100%;"></iframe>
        <div class="tradingview-widget-copyright">
            <a href="https://vn.tradingview.com/markets/?utm_source=&amp;utm_medium=widget_new&amp;utm_campaign=tickers"
                rel="noopener" target="_blank">
                <span class="blue-text">
                    Thị trường hôm nay
                </span>
            </a>
            từ TradingView
        </div>
    </div>
</template>

<style lang="scss">
.tradingview-widget-copyright {
    display: none;
}

.tradingview-widget-copyright {
    font-size: 13px !important;
    line-height: 32px !important;
    text-align: center !important;
    vertical-align: middle !important;
    /* @mixin sf-pro-display-font; */
    font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
    color: #B2B5BE !important;
}

.tradingview-widget-copyright .blue-text {
    color: #2962FF !important;
}

.tradingview-widget-copyright a {
    text-decoration: none !important;
    color: #B2B5BE !important;
}

.tradingview-widget-copyright a:visited {
    color: #B2B5BE !important;
}

.tradingview-widget-copyright a:hover .blue-text {
    color: #1E53E5 !important;
}

.tradingview-widget-copyright a:active .blue-text {
    color: #1848CC !important;
}

.tradingview-widget-copyright a:visited .blue-text {
    color: #2962FF !important;
}
</style>