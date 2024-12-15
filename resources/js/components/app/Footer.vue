<script>
export default {
	data() {
		return {
			year: (new Date()).getFullYear()
		}
	}
}
</script>
<template>
  <section class="bg-dark pt-8 pb-4 light">

<div class="container">
  <div class="position-absolute btn-back-to-top bg-dark"><a class="text-600" href="#banner" data-bs-offset-top="0"><span class="fas fa-chevron-up" data-fa-transform="rotate-45"></span></a></div>
  <div class="row">
    <div class="col-lg-4">
      <h5 class="text-uppercase text-white opacity-85 mb-3">Our Mission</h5>
      <p class="text-600">Sri Lanka's Financial Ministry and UNDP are committed to driving sustainable growth through Blue Economy initiatives. By providing comprehensive resources and support, we aim to create opportunities for investors to contribute to the prosperity of Sri Lanka while ensuring environmental protection.</p>
      <div class="icon-group mt-4"><a class="icon-item bg-white text-facebook" href="#!"><span class="fab fa-facebook-f"></span></a><a class="icon-item bg-white text-twitter" href="#!"><span class="fab fa-twitter"></span></a><a class="icon-item bg-white text-google-plus" href="#!"><span class="fab fa-google-plus-g"></span></a><a class="icon-item bg-white text-linkedin" href="#!"><span class="fab fa-linkedin-in"></span></a><a class="icon-item bg-white" href="#!"><span class="fab fa-medium-m"></span></a></div>
    </div>
    <div class="col ">
      <div class="row mt-5 mt-lg-0">
        <div class="col-lg-6 col-md-3">
          <h5 class="text-uppercase text-white opacity-85 mb-3">Partners</h5>
          <ul class="list-unstyled">
            <li class="mb-1">Our initiatives are supported by a strong network of partners dedicated to sustainable development and growth within Sri Lanka’s Blue Economy. Together, we work to provide resources, expertise, and guidance for impactful investment opportunities</li>
            <!-- <li class="mb-1">UNDP (United Nations Development Programme): A key driver in fostering sustainable development across Sri Lanka, UNDP works closely with the government and private sector to implement Blue Economy projects that align with global sustainability goals.</li>
            <li class="mb-1">UDA (Urban Development Authority): The UDA plays a pivotal role in planning and managing the infrastructure development necessary for the success of land and marine-based investments, ensuring long-term sustainability and growth.</li>
            <li class="mb-1">Sri Lanka Financial Ministry: As the primary government entity for economic management, the Financial Ministry oversees policies and initiatives that create a favorable environment for investors in Sri Lanka's Blue Economy.</li> -->
            <!-- <li class="mb-1"><a class="link-600" href="#!">Terms</a></li>
            <li class="mb-1"><a class="link-600" href="#!">Privacy</a></li>
            <li><a class="link-600" href="#!">Imprint</a></li> -->
          </ul>
        </div>
      
        <div class="col-lg-6 mt-5 mt-md-0">
          <h5 class="text-uppercase text-white opacity-85 mb-3"> Insights & Updates</h5>
          <ul class="list-unstyled">
            <li>
              <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> New Investment Strategies for 2024</a></h5>
              <p class="text-600 opacity-50"> Blue Economy opportunities. </p>
            </li>
            <li>
              <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> Sustainable Development Goals in Action</a></h5>
              <p class="text-600 opacity-50">Projects align with global sustainability targets.</p>
            </li>
            <li>
              <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> A Look Back at 2023's Progress</a></h5>
              <p class="text-600 opacity-50">Blue Economy projects.</p>
            </li>
            <!-- <li>
              <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> The New Falcon Theme</a></h5>
              <p class="text-600 opacity-50">Dec 23 &bull; 10min read </p>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- end of .container-->

</section>
 

<section class="py-0 bg-dark light">

<div>
  <hr class="my-0 text-600 opacity-25" />
  <div class="container py-3">
    <div class="row justify-content-between fs--1">
      <div class="col-12 col-sm-auto text-center">
        <p class="mb-0 text-600 opacity-85">Thank you for creating with Gsentry  <span class="d-none d-sm-inline-block">| </span><br class="d-sm-none" /> {{year}} &copy; <a class="text-white opacity-85" href="#">Gsentry</a></p>
      </div>
      <div class="col-12 col-sm-auto text-center">
        <p class="mb-0 text-600 opacity-85">v3.14.0</p>
      </div>
    </div>
  </div>
</div>
<!-- end of .container-->

</section>

</template>
