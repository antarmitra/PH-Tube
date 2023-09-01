const phData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const loading = data.data;
    // console.log(loading)
    displayData(loading);
}

const displayData = (loading) => {
    const tubeContainer = document.getElementById('tube-container');
    loading.forEach(tube => {
        // console.log(tube)
        const div = document.createElement('div');
        div.innerHTML = `<a onclick ="phTubeData('${tube.category_id}')" class="tab bg-[#FF1F3D] text-base font-medium text-white rounded-lg">${tube.category}</a>`;
        tubeContainer.appendChild(div);
    })
}


const sorted = () => {
    const phDataContainer = document.getElementById('phData-container');
    const phData = Array.from(phDataContainer.children);

    const sortedData = phData.sort((cardA, cardB) => {
        const viewsA = parseInt(cardA.querySelector("#views-items").innerText.split("K", 1));
        const viewsB = parseInt(cardB.querySelector("#views-items").innerText.split("K", 1));
        return viewsB - viewsA;
        // console.log(viewsA, viewsB)
    });

    phDataContainer.innerHTML = "";

    sortedData.forEach(card => {
        phDataContainer.appendChild(card)
    })

}


const phTubeData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const loadData = data.data;
    // console.log(loading)
    dataDiv(loadData);
}


const dataDiv = (loadData) => {
    const phDataContainer = document.getElementById('phData-container');
    phDataContainer.innerHTML = '';



    const drawContainer = document.getElementById('draw-container');
    if (loadData.length === 0) {
        drawContainer.classList.remove('hidden')
    } else {
        drawContainer.classList.add('hidden')
    }







    loadData.forEach(data => {
        // console.log(data)

        const div = document.createElement('div');

        const convertSecondToHoursMin = (second) => {
            const hours = Math.floor(second / 3600);
            const remainSecond = Math.floor(second % 3600);
            const minute = Math.floor(remainSecond / 60);

            return { hours, minute };
        }
        const totalSeconds = data.others.posted_date;
        const { hours, minute } = convertSecondToHoursMin(totalSeconds)



        div.classList = `card bg-base-100 shadow-xl`;
        div.innerHTML = ` <figure><img class="w-[300px] h-[200px] rounded-lg" src="${data.thumbnail}" alt="Shoes" /></figure>

    <div class ="bg-black text-white text-sm  rounded-md p-1 absolute md:absolute md:bottom-2 lg:right-6 right-14  lg:mb-44 md:mb-40 mt-40  ">
        <p>${hours == 0 ? '' : hours} ${hours == 0 ? '' : 'hrs'} ${minute == 0 ? '' : minute} ${minute == 0 ? '' : 'min'} ${minute == 0 ? '' : 'ago'}</p>
    </div>

        <div class="card-body">
         <div class="flex gap-2">
         <div>
             <img class="w-[40px] h-[40px] rounded-full" src="${data.authors[0].profile_picture}" alt= "">
         </div>

         <div>
         <h2 class="card-title text-xl">${data.title}</h2>

        <div class="flex gap-2">
       <span> <p class="text-base font-normal mt-1 text-gray-500 ">${data.authors[0].profile_name}</p></span>
        
        <div><p>${data.authors[0].verified === true ? '<img class= mt-2 src="image/icon.svg" alt="">' : ' '}</p></div>
        
        </div>
         <p id="views-items" class="text-base font-normal mt-1 text-gray-500">${data.others.views} views</p> 
         </div> 
         </div>         
          `;

        phDataContainer.appendChild(div);
    })

}






phData()
phTubeData("1000")