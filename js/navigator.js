let catchSelectors = function (){
    let mainLine = document.querySelector(".mainLine");
    let head = document.querySelector("head");
    return{
        head: head,
        mainLine : mainLine
    };
};

(function (){
    let catchedItems = catchSelectors();
    // console.log(catchedItems);

    const Links = [
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: ""
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&family=Bebas+Neue&family=Brygada+1918:ital,wght@0,400..700;1,400..700&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"

        },
        {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            
        },
        {
            rel: "stylesheet",
            href: "../css/navigator.css"

        },
    ];
    Links.forEach(item =>{
        const link = document.createElement("link");
        link.rel = item.rel;
        link.href = item.href;
        if(item.crossorigin !== undefined) {
            link.crossOrigin = item.crossorigin;
        }
        catchedItems?.head?.appendChild(link);
    })

    // let style = document.createElement("link");
    // style.rel="styleSheet";
    // style.href="../css/navigator.css";
    // // head?.appendChild(style);
    // catchedItems?.head?.appendChild(style);


    let header = document.createElement("div");
    header.classList.add("headerBar");
    header.innerHTML=` 
        <a class="logoLink" href="index.html">
            <img src="../assets/logo.png" alt="Logo">
        </a>
        <div class="navBox">
            <a href="#">KURUMSAL</a>
            <a href="#">HİZMETLER</a>
            <a href="#">ÜRÜNLER</a>
            <a href="#">ÖZEL YAPIM PROJELER</a>

            <a href="#">TEKNİK SERVİS VE BAKIM</a>
            <a href="#">YEDEK PARÇALAR</a>
            <a href="#">GALERİ</a>
            <a href="#">İLETİŞİM</a>
        </div>
                `;
    // mainLine?.prepend(header);
    // catchedItems?.mainLine?.prepend(header);

    let footer = document.createElement("div");
    footer.classList.add("fotterBar");
    footer.innerHTML=
    `
        <div class="footerContentSide">
            <div class="iconBar">
                <a href="#">
                    <img src="../assets/socialİcons/youtube.png" alt="Youtube İcon">
                </a>
                <a href="https://www.linkedin.com/in/kayrak-vin%C3%A7-crane-systems-b9ba56245?originalSubdomain=tr">
                    <img src="../assets/socialİcons/linkedin.png" alt="Linkedin İcon">
                </a>
                <a href="https://wa.me/905423699654">
                    <img src="../assets/socialİcons/wp.png" alt="Phoneİcon">
                </a>
            </div>
            <div class="footerOrangeLine"></div>
            <a href="#" class="footertextBar">
                KAYRAK VİNÇ CRANE SYSTEMS <br>
                Beşköprü Sanayi Sitesi D-100 Karayolu Üzeri No:188, 54050 Serdivan/Sakarya <br>
                Tel: +90 0542 369 96 54 <br>
                info@kayrakVinc.com
            </a>
        </div>
    `;
    // mainLine?.appendChild(footer);
    catchedItems?.mainLine?.appendChild(footer);

})();