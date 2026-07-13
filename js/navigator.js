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
            href: "./css/navigator.css"

        },
        {
            rel: "stylesheet",
            href: "./css/home.css"
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
    // style.href="./css/navigator.css";
    // // head?.appendChild(style);
    // catchedItems?.head?.appendChild(style);


    let header = document.createElement("div");
    header.classList.add("headerBar");
    header.innerHTML=`<div class="headerBarMobile">
             
            <a class="logoLink MainLogoLink" href="index.html">
                <img src="./assets/logo.png" alt="Logo">
            </a>
            <div class="navBox">
                <div class="iconBar">
                    <a href="#">
                        <img src="./assets/socialİcons/youtube.png" alt="Youtube İcon">
                    </a>
                    <a href="https://www.linkedin.com/in/kayrak-vin%C3%A7-crane-systems-b9ba56245?originalSubdomain=tr">
                        <img src="./assets/socialİcons/linkedin.png" alt="Linkedin İcon">
                    </a>
                    <a href="https://wa.me/905498889654">
                        <img src="./assets/socialİcons/wp.png" alt="Phoneİcon">
                    </a>
                </div>
                <div class="footerOrangeLine"></div>
                <div class="menuIconsContainer">
                    <i class="fa-solid fa-caret-down"></i>
                    <span>
                        MENU
                    </span>
                    <i class="fa-solid fa-bars"></i>
                </div>
                <ul class="wideNavBox">
                    <li>
                        <a href="../Hakkımızda.html">KURUMSAL</a>
                    </li>
                    <li>
                        <a href="../KeşifMontajVeKurulum.html">HİZMETLER</a>
                    </li>
                    <ul>
                        <li class="wideMenuUpperTitle">
                            <a href="#">ÜRÜNLER</a>
                            <i class="fa-solid fa-caret-down wideMenuUpperIcon"></i>
                        </li>
                        <ul class="wideMenuUpperDropdown">
                            <li class="wideMenuInnerTitle">
                                <a href="#">Gezer Köprü Vinçler
                                    <i class="fa-solid fa-caret-down wideMenuInnerIcon"></i>
                                </a>
                            </li>
                            <div class="wideMenuInnerSpecialLine"></div>
                                <ul class="wideMenuInnerDropdown">
                                    <li>
                                        <a href="../ÇiftKiriş.html">Çift Kiriş Köprü Vinçler</a>
                                    </li>
                                    <div class="wideMenuInnerSpecialLine"></div>
                                    <li>
                                        <a href="../MonorayVinçler.html">Monoray Köprü Vinçler</a>
                                    </li>
                                </ul>
                            <li>
                                <a href="../PortalVinçler.html">Portal Vinçler</a>
                            </li>
                            <div class="wideMenuInnerSpecialLine"></div>
                            <li>
                                <a href="../PergelVinçler.html">Pergel Vinçler</a>
                            </li>
                            <div class="wideMenuInnerSpecialLine"></div>
                            <li>
                                <a href="../KancaAltıEkipmanlar.html">Kanca Altı Ekipmanları</a>
                            </li>
                            <div class="wideMenuInnerSpecialLine"></div>
                            <li>
                                <a href="../ÖzelTasarımVinçler.html">Özel Tasarım Vinçler</a>
                            </li>
                        </ul>
                    </ul>

                    <li>
                        <a href="../ÖzelYapımProjeler.html">ÖZEL YAPIM PROJELER</a>
                    </li>
                    <li>
                        <a href="../TeknikServisVeBakım.html">TEKNİK SERVİS VE BAKIM</a>
                    </li>
                    <li>
                        <a href="../YedeKParcalar.html">YEDEK PARÇALAR</a>
                    </li>
                    <li>
                        <a href="../Galeri.html">GALERİ</a>
                    </li>
                    <li>
                        <a class="specialLink" href="../İletişim.html">İLETİŞİM</a>
                    </li>
                </ul>
            </div>
            
            <div class="mobileSideMenu">
                <i class="fa-solid fa-xmark mobilMenuCloseButton"></i>
                
                <ul class="mobilMenuNavBar">
                    <li>
                        <a href="../Hakkımızda.html">KURUMSAL</a>
                    </li>
                    <li>
                        <a href="../KeşifMontajVeKurulum.html">HİZMETLER</a>
                    </li>
                    <li>
                        <div class="dropDownLink upperDropDownLink">
                            <a href="#">ÜRÜNLER
                                <i class="fa-solid fa-caret-down"></i>
                            </a>
                        </div>
                        <ul class="dropDownUpper">
                            <li>
                                <div class="dropDownLink innerDropDownLink">
                                    <a href="#">Gezer Köprü Vinçler
                                        <i class="fa-solid fa-caret-down"></i>
                                    </a>
                                </div>
                                <ul class="dropDownInner">
                                    <li>
                                        <a href="../ÇiftKiriş.html">Çift Kiriş Köprü Vinçler</a>
                                    </li>
                                    <li>
                                        <a href="../MonorayVinçler.html">Monoray Köprü Vinçler</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="../PortalVinçler.html">Portal Vinçler</a>
                            </li>
                            <li>
                                <a href="../PergelVinçler.html">Pergel Vinçler</a>
                            </li>
                            <li>
                                <a href="../KancaAltıEkipmanlar.html">Kanca Altı Ekipmanları</a>
                            </li>
                            <li>
                                <a href="../ÖzelTasarımVinçler.html">Özel Tasarım Vinçler</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="../ÖzelYapımProjeler.html">ÖZEL YAPIM PROJELER</a>
                    </li>
                    <li>
                        <a href="../TeknikServisVeBakım.html">TEKNİK SERVİS VE BAKIM</a>
                    </li>                    
                    <li>
                        <a href="../YedeKParcalar.html">YEDEK PARÇALAR</a>
                    </li>
                    <li>
                        <a href="../Galeri.html">GALERİ</a>
                    </li>
                    <li>
                        <a href="../İletişim.html">İLETİŞİM</a>
                    </li>
                </ul>
                <div class="mobileSideMenuİconBar">
                    <div class="iconBar">
                        <a href="#">
                            <img src="./assets/socialİcons/youtube.png" alt="Youtube İcon">
                        </a>
                        <a href="https://www.linkedin.com/in/kayrak-vin%C3%A7-crane-systems-b9ba56245?originalSubdomain=tr">
                            <img src="./assets/socialİcons/linkedin.png" alt="Linkedin İcon">
                        </a>
                        <a href="https://wa.me/905498889654">
                            <img src="./assets/socialİcons/wp.png" alt="Phoneİcon">
                        </a>
                    </div>
                    <a class="logoLink" href="index.html">
                        <img class="logoLinkMobile" src="./assets/logo.png" alt="Logo">
                    </a>
                </div>
            </div>
            
        </div>`;
    // mainLine?.prepend(header);
    catchedItems?.mainLine?.prepend(header);

    let footer = document.createElement("div");
    footer.classList.add("fotterBar");
    footer.innerHTML=
    `
        <div class="footerContentSide">
            <div class="iconBar">
                <a href="#">
                    <img src="./assets/socialİcons/youtube.png" alt="Youtube İcon">
                </a>
                <a href="https://www.linkedin.com/in/kayrak-vin%C3%A7-crane-systems-b9ba56245?originalSubdomain=tr">
                    <img src="./assets/socialİcons/linkedin.png" alt="Linkedin İcon">
                </a>
                <a href="https://wa.me/905498889654">
                    <img src="./assets/socialİcons/wp.png" alt="Phoneİcon">
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


//* Mobile menu active classname handler section *//

let upperDropdownLink = document.querySelector(".dropDownLink");
// console.log("dropDownLink:",upperDropdownLink);
let innerDropdownLink = document.querySelector(".innerDropDownLink");
// console.log("innerDropDownLink:",innerDropdownLink);
let dropDownUpper = document.querySelector(".dropDownUpper");
let dropDownInner = document.querySelector(".dropDownInner");
let upperDropDownLink = document.querySelector(".upperDropDownLink");
let innerDropDownLink = document.querySelector(".innerDropDownLink");

let menuIconsContainer = document.querySelector(".menuIconsContainer");
let mobilMenuCloseButton = document.querySelector(".mobilMenuCloseButton");
let mobileSideMenu = document.querySelector(".mobileSideMenu");

let mobilMenuNavBar = document.querySelector(".mobilMenuNavBar");
let mobileSideMenuİconBar = document.querySelector(".mobileSideMenuİconBar");
let iconBar = document.querySelector(".navBox").querySelector(".iconBar");
let mainMenuDownIcon = menuIconsContainer.querySelector(".fa-caret-down");

let slideMenuUppersIcon = upperDropDownLink.querySelector(".fa-caret-down");
let slideMenuDownersIcon = innerDropDownLink.querySelector(".fa-caret-down");

let MenuContainer = document.querySelector(".navBox")


upperDropdownLink.addEventListener("click",()=>{
    // console.log("upperDropdownLink")
    dropDownUpper.classList.toggle("active");
    slideMenuUppersIcon.classList.toggle("active");
    if(dropDownUpper.classList.contains("active")){
        upperDropDownLink.classList.add("active");
    }
    else {
        setTimeout(() => {
            upperDropDownLink.classList.remove("active");
        }, 300);
    }
    if(dropDownInner.classList.contains("active")){
        dropDownInner.classList.remove("active");
        slideMenuDownersIcon.classList.remove("active");
        innerDropDownLink.classList.remove("active");
    }
    // console.log(dropDownInner.classList)
})
innerDropdownLink.addEventListener("click",()=>{
    // console.log("innerDropdownLink")
    dropDownInner.classList.toggle("active");
    if(dropDownInner.classList.contains("active")){
        innerDropDownLink.classList.add("active");
    }
    else{
        setTimeout(() => {
            innerDropDownLink.classList.remove("active");
        }, 250);
    }
    slideMenuDownersIcon.classList.toggle("active");
});

menuIconsContainer.addEventListener("click",()=>{
    console.log("open mobile slide menu")
    mainMenuDownIcon.classList.toggle("active");
    if(windowWidth <= 1980){
        console.log("ekran genişliği 2010px dan küçük")
        if(mobileSideMenu.classList.contains("active")){
            // menuIconsContainer.classList.remove("active");
            // iconBar.classList.remove("active");
            menuIconsContainer.style.transform = `translateX(0px)`;
            iconBar.style.transform=`translateX(0px)`
        }
        else{
            // iconBar.classList.add("active");
            // menuIconsContainer.classList.add("active");
            let itemPosition = menuIconsContainer.getBoundingClientRect().right; 
            let slideMenuLeftLocation = mobileSideMenu.getBoundingClientRect().left;
            console.log("Ekran Genişliği",windowWidth);
            console.log("açİlan menü sol kenar lokasyonu",slideMenuLeftLocation-300);
            console.log("kayacak olan ikonbar'İn sağ konumu",itemPosition);
            console.log("kayacak olan ikonbar'İn olmasİ gerek sağ konumu",slideMenuLeftLocation-300-20);
            let toShift= ((slideMenuLeftLocation-300-20)-itemPosition);
            console.log("toShift",toShift);;
            menuIconsContainer.style.transform = `translateX(${toShift}px)`;
            iconBar.style.transform=`translateX(${toShift}px)`
            let MenuContainerLeftBar = MenuContainer.getBoundingClientRect().left;
            console.log("MenuContainerLeftBar",MenuContainerLeftBar);
            console.log("ikon bar İn sol konumun maks gelebileceği konum",MenuContainerLeftBar+50);
            console.log("kaymİş halinin sol kenar konumu",itemPosition+toShift-120);
            if((itemPosition+toShift-120) < MenuContainerLeftBar+50){
                let overflowedSize = (itemPosition+toShift-120)-(MenuContainerLeftBar+50);
                console.log("ikon bar taştı",overflowedSize);
                let newLocationOfBars = toShift-overflowedSize;
                console.log("newLocationOfBars",newLocationOfBars);
                menuIconsContainer.style.transform = `translateX(${newLocationOfBars}px)`;
                iconBar.style.transform=`translateX(${newLocationOfBars}px)`
            }
        }
    }
    mobileSideMenu.classList.toggle("active");
    // else if(windowWidth > 900){
    //     menuIconsContainer.classList.add("activeTwo");
    //     iconBar.classList.add("activeTwo");
    // }
    setTimeout(()=>{
        mobilMenuNavBar.classList.toggle("active");
        mobileSideMenuİconBar.classList.toggle("active");
        mobilMenuCloseButton.classList.toggle("active");

        if(dropDownInner.classList.contains("active")||dropDownUpper.classList.contains("active")){
            console.log("inner menues was open")
            dropDownInner.classList.remove("active");
            slideMenuDownersIcon.classList.remove("active");
            innerDropDownLink.classList.remove("active");
            
            dropDownUpper.classList.remove("active");
            upperDropDownLink.classList.remove("active");
            slideMenuUppersIcon.classList.remove("active");
        }
    },100)
});
mobilMenuCloseButton.addEventListener("click",()=>{
    console.log("close mobile menu")
    mobileSideMenu.classList.remove("active");
    mobilMenuNavBar.classList.remove("active");
    // menuIconsContainer.classList.toggle("active");
    // iconBar.classList.toggle("active");
    menuIconsContainer.style.transform = `translateX(0px)`;
    iconBar.style.transform=`translateX(0px)`

    mainMenuDownIcon.classList.toggle("active");
    mobileSideMenuİconBar.classList.remove("active");
    mobilMenuCloseButton.classList.remove("active");

    setTimeout(()=>{
        dropDownInner.classList.remove("active");
        slideMenuDownersIcon.classList.remove("active");
        innerDropDownLink.classList.remove("active");
        
        dropDownUpper.classList.remove("active");
        upperDropDownLink.classList.remove("active");
        slideMenuUppersIcon.classList.remove("active");
    },100)
});


let windowWidth = window.innerWidth;
window.addEventListener("resize",()=>{
    windowWidth = window.innerWidth;
    if(windowWidth < 900 || windowWidth > 1440){
        console.log("ekran genişliği 900px den küçük veya 1440px den büyük")
    }
    if(windowWidth >= 2010){
        console.log("ekran genişliği 2000px den büyük")
    }
    
    console.log("windowWidth",windowWidth);
});


let wideMenuUpperIcon = document.querySelector(".wideMenuUpperIcon")
let wideMenuInnerIcon = document.querySelector(".wideMenuInnerIcon")
let wideMenuProductsTitle = document.querySelector(".wideMenuUpperTitle");
let wideMenuUpperDropdown = document.querySelector(".wideMenuUpperDropdown");
wideMenuProductsTitle.addEventListener("click",()=>{
    console.log("pressed to upper title");
    wideMenuUpperDropdown.classList.toggle("active");
    wideMenuUpperIcon.classList.toggle("active");
    if(wideMenuInnerDropdown.classList.contains("active")){
        wideMenuInnerDropdown.classList.remove("active");
        wideMenuInnerIcon.classList.remove("active");
        // wideMenuUpperDropdown.classList.remove("activeTwo");
    }
});

let wideMenuInnerTitle = document.querySelector(".wideMenuInnerTitle");
let wideMenuInnerDropdown = document.querySelector(".wideMenuInnerDropdown");

wideMenuInnerTitle.addEventListener("click",()=>{
    console.log("pressed to Inner Title")
    wideMenuInnerDropdown.classList.toggle("active");
    wideMenuInnerIcon.classList.toggle("active");
    // wideMenuUpperDropdown.classList.toggle("activeTwo");
})

const wideNavBox = document.querySelector(".wideNavBox");

document.addEventListener("click", (e) => {
    if (!wideNavBox.contains(e.target)) {
        wideMenuUpperDropdown.classList.remove("active");
        wideMenuUpperIcon.classList.remove("active");

        wideMenuInnerDropdown.classList.remove("active");
        wideMenuInnerIcon.classList.remove("active");
    }
});

document.addEventListener("click", (e) => {
    if (
        mobileSideMenu.classList.contains("active") &&
        !mobileSideMenu.contains(e.target) &&
        !menuIconsContainer.contains(e.target)
    ) {

        mobileSideMenu.classList.remove("active");
        mobilMenuNavBar.classList.remove("active");
        mobileSideMenuİconBar.classList.remove("active");
        mobilMenuCloseButton.classList.remove("active");

        dropDownUpper.classList.remove("active");
        upperDropDownLink.classList.remove("active");
        slideMenuUppersIcon.classList.remove("active");

        dropDownInner.classList.remove("active");
        innerDropDownLink.classList.remove("active");
        slideMenuDownersIcon.classList.remove("active");

        menuIconsContainer.style.transform = "translateX(0px)";
        iconBar.style.transform = "translateX(0px)";
        mainMenuDownIcon.classList.remove("active");
    }
});