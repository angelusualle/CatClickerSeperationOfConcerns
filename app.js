//Model
let model = {
    cats : [{
            name: 'Baby',
            clicks: 0,
            src: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'
        },
        {
            name: 'Sneaky',
            clicks: 0,
            src: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'

        },
        {
            name: 'Sleepy',
            clicks: 0,
            src: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
        },
        {
            name: 'Slinky',
            clicks: 0,
            src: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr07/4/16/enhanced-16354-1396642706-25.jpg?downsize=715:*&output-format=auto&output-quality=auto'
        },
        {
            name: 'Rainy',
            clicks: 0,
            src: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr04/10/12/enhanced-buzz-29081-1397145781-14.jpg?downsize=715:*&output-format=auto&output-quality=auto'
        }
    ]
}
//Octopus
let octopus = {
    init: function init() {
        view.renderNav(model.cats);
        view.render(model.cats[0]);
    },

    incrementCatClick: function incrementCatClick(cat) {
        ++cat.clicks;
    },

    renderName: function renderName(cat) {
        for (c of model.cats) {
            if (c.name == cat) {
                view.render(c);
                return;
            }
        }
    },
    saveCat: function saveCat(cat, newCat){
        cat.name = newCat.name;
        cat.src = newCat.src;
        cat.clicks = newCat.clicks;
    },
    reRenderNav: function reRenderNav(){
        view.renderNav(model.cats);
    }
}

//View
let view = {
    renderNav: function renderNav(cats) {
        document.querySelector('#sidebar ul').innerHTML = '';
        const frag = document.createDocumentFragment();
        cats.forEach(c => {
            const li = document.createElement('li');
            li.innerText = c.name;
            frag.appendChild(li);
        });
        document.querySelector('#sidebar ul').appendChild(frag);
        document.querySelector('#sidebar').addEventListener('click', (e) => {
            if (e.target.nodeName == 'LI') {
                octopus.renderName(e.target.innerText);
            }
        });
    },
    render: function render(cat) {
        document.querySelector('#cat-display').innerHTML = '';
        const frag = document.createDocumentFragment();
        const div = document.createElement('div');
        div.innerHTML =
            `<h1>${cat.name}</h1>
            <img alt="cat" src="${cat.src}">
            <h1>Clicks:<span>${cat.clicks}</span></h1>
            <button id="admin">Admin</button>
            <div class="outer-form hidden">
                <div class="form">
                    <label for="name">Name:</label><input type="text" id="name" value =${cat.name}><br>
                    <label for="url">Picture URL:</label><input type="text" id="url" value="${cat.src}"><br>
                    <label for="clicks">Clicks:</label><input type="text" id="clicks" value="${cat.clicks}"><br>
                    <button id="submit">Submit</button>
                </div>
            </div>`;
        frag.appendChild(div);
        document.querySelector('#cat-display').appendChild(frag);
        document.querySelector('img').addEventListener('click', () => {
            octopus.incrementCatClick(cat);
            document.querySelector('span').innerText = cat.clicks;
        });
        document.querySelector('#admin').addEventListener('click', () => {
            document.querySelector('.outer-form').classList.toggle('hidden');
        });
        document.querySelector('#submit').addEventListener('click', () => {
            let newCat = {
                name: document.querySelector('#name').value,
                src: document.querySelector('#url').value,
                clicks: Number(document.querySelector('#clicks').value)
            }
            octopus.saveCat(cat, newCat);
            render(cat);
            octopus.reRenderNav();
        });
    }
}
//Start
octopus.init();