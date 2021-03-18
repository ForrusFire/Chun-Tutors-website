<!DOCTYPE html>

<html lang="en-US">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<title>Chun Tutors</title>
		<meta name="author" content="Sam Chun">
		<meta name="keywords" content="TODO">
		<meta name="description" content="TODO">
		<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
		<link rel="canonical" href="TODO">
		<link rel="icon" href="../../images/Logo Icon.png">

		<!--Add other meta properties-->



		<!--CSS Stylesheets-->
		<link rel="stylesheet" href="../../stylesheets/styles_1.4.css">
	</head>


	<body>
		<div class="sc-website sc-white-background sc-website-minwrap">
			<header>
				<!--Navbar-->
				<div class="sc-Navbar sc-shadow sc-white-background">
					<div class="sc-Navbar-left">
						<div class="sc-Navbar-elem">
							<a href="sms:+18586499184" class="sc-clickable sc-verdana sc-xmedium"><span>💬 TEXT</span></a>
						</div>
						<div class="sc-Navbar-elem">
							<a href="mailto:sam@chuntutors.com" class="sc-clickable sc-verdana sc-xmedium"><span>✉️ EMAIL</span></a>
						</div>
					</div>
					<div class='sc-Navbar-left-mobile'>
						<button class='sc-Navbar-mobile-stack-button sc-white-background' onclick="mobileStackButton()">
							<img src='../../images/stack icon.png' class='sc-pic-stack-button'>
						</button>
					</div>
					<div class="sc-Navbar-center sc-center">
						<div class="sc-Navbar-logo">
							<a href="../.." onclick='mobileStackButtonClose()'>
								<img src="../../images/Logo.png" class='sc-pic-logo' alt='Chun Tutors Logo'>
							</a>
						</div>
					</div>
					<div class="sc-Navbar-right"></div>
				</div>

				<!--Mobile Stack Button-->
				<div class='sc-mobile-stack-button sc-white-background' style='opacity:0; z-index:-1; transition:opacity 200ms 0ms, z-index 0ms 0ms;'>
					<a href="sms:+18586499184" class="sc-mobile-Navbar-elem sc-center sc-clickable sc-verdana sc-xlarge"><span>💬 TEXT</span></a>
					<a href="mailto:sam@chuntutors.com" class="sc-mobile-Navbar-elem sc-center sc-clickable sc-verdana sc-xlarge"><span>✉️ EMAIL</span></a>
				</div>
			</header>

			<main>
				<!--Content-->
				<div class='sc-content sc-content-minwrap'>
                    <!--Purchase Complete Message-->
                    <div class='sc-pricing-starter sc-center'>
                        <div class='sc-purchase-complete sc-xlarge'>
							<strong>Package Purchase Complete!</strong>
						</div>

                        <img src="../../images/Checkmark.png" class='sc-pic-checkmark' alt='Green Checkmark'>

						<div class='sc-xx5medium sc-purchase-thankyou sc-marginleft-medium sc-marginright-medium'>
							Thank you! One of our tutor specialists will contact you through text within the next 24 hours.
						</div>
						<div class='sc-xmedium sc-lightgray sc-italics sc-marginleft-medium sc-marginright-medium'>
							A receipt has been sent to your email address.
						</div>

						<a href='../..' class='sc-purchase-complete-button sc-href-no-underline sc-xmedium'>
							<span>ALL DONE</span>
						</a>

						<div class='sc-mediumpadding'></div>
					</div>
                </div>
            </main>
					

			<footer class='sc-footer sc-center sc-gray sc-medium'>
                <div class='sc-footerline'></div>
				<p>&#169; Copyright 2021 Chun Tutors, LLC. All Rights Reserved.</p>
				<div class='sc-smallpadding'></div>
			</footer>

			<!--Scripts-->
			<script>
				// Mobile Stack Button
				function mobileStackButton() {
					var mobileStackButton = document.getElementsByClassName('sc-mobile-stack-button')[0];
					if (mobileStackButton.style.opacity == '0'){
						mobileStackButton.style.zIndex = '1';
						mobileStackButton.style.opacity = '1';
						mobileStackButton.style.transition = 'opacity 200ms 0ms, z-index 0ms 0ms';
					} else{
						mobileStackButton.style.opacity = '0';
						mobileStackButton.style.zIndex = '-1';
						mobileStackButton.style.transition = 'opacity 200ms 0ms, z-index 0ms 200ms';
					}
				}
				// Close Mobile Stack Button
				function mobileStackButtonClose() {
					var mobileStackButton = document.getElementsByClassName('sc-mobile-stack-button')[0];
					if (mobileStackButton.style.opacity == '1') {
						mobileStackButton.style.opacity = '0';
						mobileStackButton.style.zIndex = '-1';
						mobileStackButton.style.transition = 'opacity 200ms 0ms, z-index 0ms 200ms';
					}
				}
			</script>
		</div>
	</body>
</html>

<?php
    // remove session variables
    session_unset();

    // destroy session
    session_destroy();
?>