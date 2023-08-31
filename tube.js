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
        console.log(tube)
        const div = document.createElement('div');
        div.innerHTML = `<a onclick ="phTubeData('${tube.category_id}')" class="tab bg-[#FF1F3D] text-base font-medium text-white rounded-lg">${tube.category}</a>`;
        tubeContainer.appendChild(div);
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

    loadData.forEach(data => {
        console.log(data)
        const div = document.createElement('div');
        div.classList = `card bg-base-100 shadow-xl`;
        div.innerHTML = ` <figure><img class="w-[300px] h-[200px] rounded-lg" src="${data.thumbnail}" alt="Shoes" /></figure>
        <div class="card-body">
         <div class="flex gap-2">
         <div>
             <img class="w-[40px] h-[40px] rounded-full" src="${data.authors[0].profile_picture}" alt= "">
         </div>

         <div>
         <h2 class="card-title text-xl">${data.title}</h2>

        <div class="flex">
        <p class="text-base font-normal mt-1 text-gray-500 ">${data.authors[0].profile_name}</p> 
        </div>

         <p class="text-base font-normal mt-1 text-gray-500">${data.others.views}</p> 
         </div> 
         </div>         
          `;

        phDataContainer.appendChild(div);
    })

}






phData()
phTubeData("1000")