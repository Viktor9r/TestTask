const arrayData = [
    {
        id: 1,
        logo: 'assets/Logos/fanduel.svg',
        title: "Fanduel",
        headline: "Bet $5, Get $200",
        about: "New customers only. Deposit min $10. Place first bet of min $5 and get $200 in Bonus Bets if wager wins (within 72 hours).",
        rating: 4.7,
        link: "/",
        payout_min: 1,
        payout_max: 7,
        benefits: ["Best user experience", "World-class mobile app", "Best for live betting"],
        code: ""
    },
    {
        id: 2,
        logo: "assets/Logos/caesars.svg",
        title: "Caesars",
        headline: "$1000 First Bet on Caesars",
        about: "Terms & conditions apply",
        rating: 4.7,
        link: "/",
        payout_min: 1,
        payout_max: 5,
        benefits: ["Best customer support", "Highly trusted legacy brand", "NFL live streaming"],
        code: "COVERBONUS1000"
    },
    {
        id: 3,
        logo: "assets/Logos/bet365.svg",
        title: "Bet365",
        headline: "Bet $5, Get $150",
        about: "or $1000 First Bet Safety Net",
        rating: 4.5,
        link: "/",
        payout_min: 0,
        payout_max: 5,
        benefits: ["Best prices", "Gold standart layout", "World-class live betting"],
        code: "COVERS"
    },
]

function createSportsbookItem(item, rank) {
    const list = document.getElementById('sportsbookList');
    const rowHtml = `
        <div class="sportsbook-row">
            <div class="${rank === 0 ? 'number-plate number-plate--first' : 'number-plate number-plate--other'}">
                ${rank === 0 ? 'Top-rated sportsbook' : `#${rank + 1}`}
            </div>
            <div class="logo-cell">
                <img loading="lazy" alt="${item.title} Logo" src="${item.logo}" />
            </div>
            <div class="bonus-cell">
                <div class="bonus-cell-plate">Sign up bonus</div>
                <div class="bonus-cell-title">${item.headline}</div>
                <div class="bonus-cell-about">${item.about}</div>
            </div>
            <div class="divider"></div>
            <div class="rating-cell">
                <div class="rating-cell-container">
                    <div class="rating-cell-desktopstars">
                        <div class="rating-stars" style="--rating: ${item.rating}">
                            <div class="white-stars-background"></div>
                        </div>
                    </div>
                    <div class="rating-cell-title">Customer support</div>
                    <div class="rating-cell-value">
                        <div>
                            <svg class="rating-cell-icon" fill="#000000" width="800px" height="800px" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg"><path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z"/></svg>
                        </div>
                        ${item.rating}/5
                    </div>
                    <a href="${item.link}" class="rating-cell-link">${item.title} Review</a>
                </div>
                <div class="rating-cell-container rating-cell-container--second">
                    <div class="rating-cell-title">Payout speed:</div>
                    <div class="rating-cell-value">
                        <img loading="lazy" src="assets/Icons/currency-outlined-icon.png" class="rating-cell-icon rating-cell-icon--second" />
                        ${item.payout_min} - ${item.payout_max} days
                    </div>
                </div>
            </div>
            <div class="payout-cell">
                <div class="payout-cell-icon"></div>
                <div class="payout-cell-value">${item.payout_min}-${item.payout_max} days</div>
            </div>
            <div class="benefits-cell">
                <ul class="benefits-cell-list">
                    ${item.benefits?.map(benefit => `<li class="benefits-cell-item"><img loading="lazy" src="assets/Icons/check-icon.svg" class="benefits-cell-icon" />${benefit}</li>`).join('')}
                </ul>
            </div>
            <div class="bet-button-cell">
                ${item.code ? `
                    <button class="bet-button-cell-promo" onclick="copyPromoCode('${item.code}')">
                        <div class="bet-button-cell-promo-title">Tap to copy code</div>
                        <div class="bet-button-cell-promo-code">${item.code}</div>
                    </button>
                ` : ''}
                <a href="${item.link}" class="bet-button-cell-link">Bet Now</a>
            </div>
        </div>
    `;
    list.insertAdjacentHTML('beforeend', rowHtml);
}

function copyPromoCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert('Code successfully copied');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    let isOpen = false;

    dropdownToggle.addEventListener('click', function() {
        isOpen = !isOpen;
        dropdownMenu.style.display = isOpen ? 'block' : 'none';
        dropdownToggle.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sortType = this.textContent.trim().split("\n")[0];
            updateSortType(sortType);
            dropdownToggle.textContent = sortType;
            isOpen = false;
            dropdownMenu.style.display = 'none';
            updateCheckIconsAndFont(this);
        });
    });

    function updateCheckIconsAndFont(selectedItem) {
        document.querySelectorAll('.dropdown-item').forEach(item => {
            const icon = item.querySelector('.check-icon');
            icon.style.visibility = 'hidden';
            item.style.fontWeight = 'normal';
        });
        selectedItem.querySelector('.check-icon').style.visibility = 'visible';
        selectedItem.style.fontWeight = '600';
    }

    function updateSortType(sortType) {
        if (sortType === "Rating") {
            arrayData.sort((a, b) => b.rating - a.rating);
        } else if (sortType === "Payout speed") {
            arrayData.sort((a, b) => a.payout_min - b.payout_min);
        } else {
            arrayData.sort((a, b) => a.id - b.id);
        }
        displaySportsbooks();
    }

    function displaySportsbooks() {
        const list = document.getElementById('sportsbookList');
        list.innerHTML = '';
        arrayData.forEach((item, index) => createSportsbookItem(item, index));
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sportsbooks = document.querySelectorAll('.rating-stars');
    sportsbooks.forEach(sportsbook => {
        const rating = parseFloat(sportsbook.style.getPropertyValue('--rating'));
        const percent = (rating / 5) * 100;
        sportsbook.style.setProperty('--percent', `${percent}%`);
    });
});


arrayData.forEach((item, index) => createSportsbookItem(item, index));
