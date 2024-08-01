//CODIGO PARA ESTILIZAR A HEADER
document.addEventListener('DOMContentLoaded', () => {
  const tabs1Control1 = document.getElementById('tabs-1-tab-1');
  const tabs1Painel1 = document.getElementById('tabs-1-panel-1');
  if(tabs1Control1 && tabs1Painel1) {
    tabs1Painel1.classList.add('hidden');
    tabs1Control1.addEventListener('click', () => {
    if(tabs1Painel1.classList.contains('hidden')) {
      tabs1Painel1.classList.remove('hidden');
      tabs1Painel1.classList.add('border-gray-900', 'text-gray-900');
      tabs1Painel1.classList.remove('border-transparent', 'text-indigo-700');
    } else {
      tabs1Painel1.classList.add('hidden');
      tabs1Painel1.classList.remove('border-gray-900', 'text-indigo-600');
      tabs1Painel1.classList.add('border-transparent', 'text-indigo-700', 'hover:text-indigo-800');
    }
  })
  } else {
    console.log('Nenhuma id foi encontrado bloco 1')
  }
  


  

  const tabs1Control2 = document.getElementById('tabs-1-tab-2');
  const tabs1Painel2 = document.getElementById('tabs-1-panel-2');
  if(tabs1Control2 && tabs1Painel2) {
  tabs1Painel2.classList.add('hidden');

  tabs1Control2.addEventListener('click', () => {
    if (tabs1Painel2.classList.contains('hidden')) {
      tabs1Painel2.classList.remove('hidden');
      tabs1Painel2.classList.add('border-gray-900', 'text-gray-900', 'transition', 'ease-out', 'duration-200');
      tabs1Painel2.classList.remove('border-transparent', 'text-indigo-700');
    } else {
      tabs1Painel2.classList.add('hidden');
      tabs1Painel2.classList.remove('border-gray-900', 'text-gray-900');
      tabs1Painel2.classList.add('border-transparent', 'text-indigo-700', 'text-indigo-800');
    }
  });
  } else {
    console.log('O id nao foi encontrado no bloco 2')
  }
  

  const womenClothingHeadingMobile = document.getElementById('women-clothing-heading-mobile');
  const womenClothingHeadingMobileContainer = document.querySelector('[aria-labelledby="women-clothing-heading-mobile"]');
  if(womenClothingHeadingMobile && womenClothingHeadingMobileContainer) {
     womenClothingHeadingMobileContainer.classList.add('hidden')
    womenClothingHeadingMobile.addEventListener('click', () => {
    womenClothingHeadingMobileContainer.classList.toggle('hidden');
  })
  }
 

 
  const  womenAccessoriesHeadingMobile = document.getElementById('women-accessories-heading-mobile');
  const womenAccessoriesHeadingMobileContainer = document.querySelector('[aria-labelledby="women-accessories-heading-mobile"]');
  if(womenAccessoriesHeadingMobile && womenAccessoriesHeadingMobileContainer) {
  womenAccessoriesHeadingMobileContainer.classList.add('hidden')
  womenAccessoriesHeadingMobile.addEventListener('click', () => {
  womenAccessoriesHeadingMobileContainer.classList.toggle('hidden');
  })
  }
 

  const  womenBrandsHeadingMobile = document.getElementById('women-brands-heading-mobile');
  const womenBrandsHeadingMobileContainer = document.querySelector('[aria-labelledby="women-brands-heading-mobile"]')
  if(womenBrandsHeadingMobile && womenBrandsHeadingMobileContainer) {
  womenBrandsHeadingMobileContainer.classList.add('hidden')
  womenBrandsHeadingMobile.addEventListener('click', () => {
  womenBrandsHeadingMobileContainer.classList.toggle('hidden');
  })
  }
 

  const  menClothingHeadingMobile = document.getElementById('men-clothing-heading-mobile');
  const menClothingHeadingMobileContainer = document.querySelector('[aria-labelledby="men-clothing-heading-mobile"]');
  if(menClothingHeadingMobile && menClothingHeadingMobileContainer) {
  menClothingHeadingMobileContainer.classList.add('hidden')
  menClothingHeadingMobile.addEventListener('click', () => {
  menClothingHeadingMobileContainer.classList.toggle('hidden');
  })
  }
 

  const  menAccessoriesHeadingMobile = document.getElementById('men-accessories-heading-mobile');
  const menAccessoriesHeadingMobileContainer = document.querySelector('[aria-labelledby="men-accessories-heading-mobile"]')
  if(menAccessoriesHeadingMobile && menAccessoriesHeadingMobileContainer) {
  menAccessoriesHeadingMobileContainer.classList.add('hidden')
  menAccessoriesHeadingMobile.addEventListener('click', () => {
  menAccessoriesHeadingMobileContainer.classList.toggle('hidden');
  })
  }

  const  menBrandsHeadingMobile = document.getElementById('men-brands-heading-mobile');
  const menBrandsHeadingMobileContainer = document.querySelector('[aria-labelledby="men-brands-heading-mobile"]');
  if(menBrandsHeadingMobile && menBrandsHeadingMobileContainer) {
  menBrandsHeadingMobileContainer.classList.add('hidden')
  menBrandsHeadingMobile.addEventListener('click', () => {
  menBrandsHeadingMobileContainer.classList.toggle('hidden');
  })
  }
  
  const  toggleMenuMenButton = document.getElementById('toggle-menu');
  const menMenu = document.querySelector('#men-menu')
  menMenu.classList.add('hidden')
  toggleMenuMenButton.addEventListener('click', () => {
  menMenu.classList.toggle('hidden');
  })

  const  toggleMenuWomenButton = document.getElementById('toggle-menu-women');
  const womenMenu = document.getElementById('women-menu')
  womenMenu.classList.add('hidden')
  toggleMenuWomenButton.addEventListener('click', () => {
  womenMenu.classList.toggle('hidden');
  })

  const  closeMenuMobile = document.getElementById('close-menu-mobile');
  const showMenu = document.getElementById('show-menu');
  showMenu.classList.add('hidden')
  
  const showMenuMobile = document.querySelector('[aria-controls="mobile-show-open"]');
  showMenuMobile.addEventListener('click', () => {
  showMenu.classList.remove('hidden');
  });

  closeMenuMobile.addEventListener('click', () => {
  showMenu.classList.add('hidden');
  })
})