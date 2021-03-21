<?php
	// initiate the session
	session_start();
?>

<!DOCTYPE html>

<html lang="en-US">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

		<title>Chun Tutors</title>
		<meta name="author" content="Sam Chun">
		<meta name="keywords" content="Chun Tutors, tutor, tutors, lesson, lessons, online, learning, exercises, affordable,
			math, calculus, statistics, physics, economics, microeconomics, macroeconomics, art, anatomy">
		<meta name="description" content="Hello, we are Chun Tutors! We are the #1 rated online tutoring network in the San Diego area, 
			with 100% 5-star reviews and over 1,000 combined hours of private tutoring experience. Monthly payments available!">
		<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
		<link rel="canonical" href="https://chuntutors.com">
		<link rel="icon" href="../images/Logo Icon.png">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:light|Inter">

		<meta property="og:site_name" content="Chun Tutors">
		<meta property="og:title" content="Chun Tutors">
		<meta property="og:url" content="https://chuntutors.com">
		<meta property="og:type" content="website">
		<meta property="og:description" content="Hello, we are Chun Tutors! We are the #1 rated online tutoring network in the San Diego area, 
			with 100% 5-star reviews and over 1,000 combined hours of private tutoring experience. Monthly payments available!">

		<!--CSS Stylesheets-->
		<link rel="stylesheet" href="../stylesheets/styles_1.4.css">
	</head>


	<body>
		<div class="sc-website sc-white-background">
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
							<img src='../images/stack icon.png' class='sc-pic-stack-button'>
						</button>
					</div>
					<div class="sc-Navbar-center sc-center">
						<div class="sc-Navbar-logo">
							<a href=".." onclick='mobileStackButtonClose()'>
								<img src="../images/Logo.png" class='sc-pic-logo' alt='Chun Tutors Logo'>
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
				<div class='sc-content'>
					<!--Pricing-->
					<div class='sc-pricing-starter'>
						<div class='sc-pricing-title sc-largepadding sc-gray sc-center'>
                            <h1>Package Pricing and Availability</h1>
                        </div>

						<!--PHP Script Preform-->
						<?php
							$name = $studentparent = $pnumber = $eaddress = $pref_tutor = $past_referral = $referral_name = $num_sessions = $time_pref = "";
							$nameErr = $studentparentErr = $pnumberErr = $eaddressErr = $past_referralErr = $referral_nameErr = $num_sessionsErr = $time_prefErr = "";
						
							if ($_SERVER["REQUEST_METHOD"] == "POST") {
								if (empty($_POST["name"])) {
									$nameErr = "Enter a name";
								} else {
									$name = test_input($_POST["name"]);
									// check if name only contains letters and whitespace
									if (!preg_match("/^[a-zA-Z-' ]*$/", $name)) {
										$nameErr = "Only letters and white space allowed";
									}

									if (empty($_POST["studentparent"])) {
										$studentparentErr = "Select one of the options below";
									} else {
										$studentparent = test_input($_POST["studentparent"]);
									}
								}
								
								if (empty($_POST["pnumber"])) {
									$pnumberErr = "Enter a phone number";
								} else {
									$pnumber = test_input($_POST["pnumber"]);
									// check if phone number is well-formed
									if (!preg_match("/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/", $pnumber)) {
										$pnumberErr = "Invalid phone number";
									}
								}
									
								if (empty($_POST["eaddress"])) {
									$eaddressErr = "Enter an email address";
								} else {
									$eaddress = test_input($_POST["eaddress"]);
									// check if e-mail address is well-formed
									if (!filter_var($eaddress, FILTER_VALIDATE_EMAIL)) {
										$eaddressErr = "Invalid email format";
									}
								}

								$pref_tutor = test_input($_POST["pref_tutor"]);

								if (empty($_POST["past_referral"])) {
									$past_referralErr = "Select one of the options below";
								} else {
									$past_referral = test_input($_POST["past_referral"]);
									if ($past_referral == "Yes") {
										if (empty($_POST["referral_name"])) {
											$referral_nameErr = "Enter a referral name";
										} else {
											$referral_name = test_input($_POST["referral_name"]);
										}
									} else {
										$referral_name = "";
										$referral_nameErr = "";
									}
								}

								if (empty($_POST["num_sessions"])) {
									$num_sessionsErr = "Select one of the options below";
								} else {
									$num_sessions = test_input($_POST["num_sessions"]);
								}

								$time_pref = $_POST["time_pref"];
								if (count($time_pref) < 2) {
									$time_prefErr = "Select at least two times";
								}
							}
						
							function test_input($data) {
								$data = trim($data);
								$data = stripslashes($data);
								$data = htmlspecialchars($data);
								return $data;
							}
						?>

						<!--Info Form-->
						<div id='info_form' style='display:block;'>
							<!--Form-->
							<form action='<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>' method='post'>
								<div class='sc-marginleft sc-marginright sc-marginbottom sc-whiter-background sc-rounded-corners sc-shadow-3'>
									<div class='sc-xsmallpadding'></div>
									<div class='sc-pricing-elem' onchange="studentparentActivate()">
										<div class='sc-marginbottom'>
											<b>Full Name</b>
										</div>
										<div>
											<input type='text' class='sc-form' name='name' value="<?php echo $name;?>">
										</div>
										<div class='sc-margintop-xsmall sc-red sc-xmedium'><?php echo $nameErr;?></div>
									</div>
									<div class='sc-margintop sc-marginbottom-small sc-pricing-referral' id="studentparent" style='display:none;'>
										<div class='sc-marginbottom'>
											<b>I am the</b>
										</div>
										<div class='sc-marginbottom sc-red sc-xmedium'><?php echo $studentparentErr;?></div>
										<div>
											<div class='sc-marginbottom'>
												<span class='sc-radio'>
													<input type='radio' id='Student' value='Student' name='studentparent' 
														<?php if (isset($studentparent) && $studentparent == "Student") {echo "checked";}?>>
												</span>
												<label for='Student'>Student</label>
											</div>
											<div class='sc-marginbottom'>
												<input type='radio' id='Parent' value='Parent' name='studentparent'
													<?php if (isset($studentparent) && $studentparent == "Parent") {echo "checked";}?>>
												<label for='Parent'>Parent</label>
											</div>
										</div>
										<br>
										<script>
											// Activate studentparent Radio
											studentparentActivate();

											function studentparentActivate() {
												var name = document.getElementsByName("name")[0];
												var studentparent = document.getElementById("studentparent");

												if (name.value != "") {
													studentparent.style.display = "block";
												}
											}
										</script>
									</div>
									<div class='sc-pricing-elem'>
										<div class='sc-marginbottom'>
											<b>Phone Number</b>
										</div>
										<div>
											<input type='text' class='sc-form' name='pnumber' value="<?php echo $pnumber;?>">
										</div>
										<div class='sc-margintop-xsmall sc-red sc-xmedium'><?php echo $pnumberErr;?></div>
									</div>
									<br>
									<div class='sc-pricing-elem'>
										<div class='sc-marginbottom'>
											<b>Email Address</b>
										</div>
										<div>
											<input type='text' class='sc-form' name='eaddress' value="<?php echo $eaddress;?>">
										</div>
										<div class='sc-margintop-xsmall sc-red sc-xmedium'><?php echo $eaddressErr;?></div>
									</div>
									<br>
									<div class='sc-pricing-elem'>
										<div class='sc-marginbottom'>
											<b>Preferred Tutor</b>
										</div>
										<div>
											<select class='sc-select' id='select-tutor-preference' name='pref_tutor' onchange='meetingTimeUpdate()'>
												<option value='No preference'>No preference</option>
												<?php
													$servername = "localhost";
													$username = "uooqnklfygq2q";
													$password = "(3w?@q23s5fP";
													$dbname = "dbizw9tdvmzdch";
										
													// Create connection
													$conn = new mysqli($servername, $username, $password, $dbname);
													// Check connection
													if ($conn->connect_error) {
														die("Connection failed: " . $conn->connect_error);
													}
													
													$sql = "SELECT * FROM Tutors";
													$result = $conn->query($sql);

													// output data of each row
													while($row = $result->fetch_assoc()) {
														echo "<option value='" . $row["tutor"] . "'>" . $row["tutor"] . "</option>";
													}
					
													$conn->close();
												?>
											</select>
											<script>
												var pref_tutor_children = document.getElementsByName('pref_tutor')[0].children;
												var selected_pref_tutor = <?php echo "'" . $pref_tutor . "'";?>;

												for (var i = 0; i < pref_tutor_children.length; i++) {
													if (pref_tutor_children[i].innerHTML == selected_pref_tutor) {
														pref_tutor_children[i].selected = true;
														break;
													}
												}
											</script>
										</div>
									</div>
									<br>
									<div class='sc-pricing-elem'>
										<div class='sc-marginbottom'>
											<b>Are you referred from a past student?</b>
										</div>
										<div class='sc-marginbottom sc-red sc-xmedium'><?php echo $past_referralErr;?></div>
										<div onchange="referralRadio()">
											<div class='sc-marginbottom'>
												<span class='sc-radio'>
													<input type='radio' id='referralYes' value='Yes' name='past_referral' 
														<?php if (isset($past_referral) && $past_referral == "Yes") {echo "checked";}?>>
												</span>
												<label for='referralYes'>Yes</label>
											</div>
											<div class='sc-marginbottom'>
												<input type='radio' id='referralNo' value='No' name='past_referral'
													<?php if (isset($past_referral) && $past_referral == "No") {echo "checked";}?>>
												<label for='referralNo'>No</label>
											</div>
										</div>
									</div>
									<div class='sc-margintop sc-marginbottom sc-pricing-referral' id='past_referralName' style='display:none;'>
										<div>
											<div class='sc-marginbottom'>
												<b>Name of Referral</b>
											</div>
										</div>
										<div>
											<input type='text' class='sc-form' name='referral_name' value='<?php echo $referral_name;?>'>
										</div>
										<div class='sc-margintop-xsmall sc-red sc-xmedium'><?php echo $referral_nameErr;?></div>
										<br>
									</div>
									<div class='sc-pricing-elem'>
										<div class='sc-marginbottom'>
											<b>How many sessions per week?</b>
										</div>
										<div class='sc-marginbottom sc-red sc-xmedium'><?php echo $num_sessionsErr;?></div>
										<div>
											<div class='sc-marginbottom'>
												<span class='sc-radio'>
													<input type='radio' id='num_sessions1' value='1' name='num_sessions'
														<?php if (isset($num_sessions) && $num_sessions == "1") {echo "checked";}?>>
												</span>
												<label for='num_sessions1'>1</label>
											</div>
											<div class='sc-marginbottom'>
												<input type='radio' id='num_sessions2' value='2' name='num_sessions'
													<?php if (isset($num_sessions) && $num_sessions == "2") {echo "checked";}?>>
												<label for='num_sessions2'>2</label>
											</div>
										</div>
									</div>
									<br>
									<div class='sc-pricing-elem'>
										<div class='sc-marginbottom'>
											<b>Pick which days you'd like to meet.</b>
										</div>
										<div id='time_prefErr' class='sc-marginbottom sc-red sc-xmedium'><?php echo $time_prefErr;?></div>
										<div>
											<div id='check-time-pref'>
												<!--Checkbox Options Injection-->
											</div>
											<script>
												meetingTimeUpdate();

												function meetingTimeUpdate() {
													// Get Selected Tutor
													var tutor_pref_children = document.getElementById('select-tutor-preference').children;
													var tutor;
													for (var i = 0; i < tutor_pref_children.length; i++) {
														var tutorName = tutor_pref_children[i];
														if (tutorName.selected) {
															tutor = tutorName.innerHTML;
														}
													}

													// Retrieve Data from Availability Database
													var timeArray = [
														<?php
															$servername = "localhost";
															$username = "uooqnklfygq2q";
															$password = "(3w?@q23s5fP";
															$dbname = "dbizw9tdvmzdch";
												
															// Create connection
															$conn = new mysqli($servername, $username, $password, $dbname);
															// Check connection
															if ($conn->connect_error) {
																die("Connection failed: " . $conn->connect_error);
															}
															
															$sql = "SELECT * FROM Availability";
															$result = $conn->query($sql);
			
															while($row = $result->fetch_assoc()) {
																$row_tutor = $row['tutor'];
																$row_time = $row['time'];
																echo "'$row_tutor'," . "'$row_time',";
															}
							
															$conn->close();
														?>
													];
													
													// Remove Time Nodes
													var time_checkbox = document.getElementById('check-time-pref');
													var time_checkbox_fchild = time_checkbox.firstElementChild;
													while (time_checkbox_fchild) {
														time_checkbox.removeChild(time_checkbox_fchild);
														time_checkbox_fchild = time_checkbox.firstElementChild;
													}

													// Replace Correct Time Nodes
													var set = [];
													for (var i = 0; i < timeArray.length; i += 2) {
														if (timeArray[i] == tutor || tutor == "No preference") {
															var availTime = timeArray[i+1];
															if (set.includes(availTime)) {
																continue;
															}
															set.push(availTime);

															var newElem = document.createElement("input");
															newElem.setAttribute("type", "checkbox");
															newElem.setAttribute("id", availTime);
															newElem.setAttribute("name", "time_pref[]");
															newElem.setAttribute("value", availTime);
															
															newElem.classList.add("sc-checkbox");
															time_checkbox.appendChild(newElem);
															
															var newLabel = document.createElement("label");
															newLabel.setAttribute("for", availTime);
															var newText = document.createTextNode(availTime);
															newLabel.appendChild(newText);
															time_checkbox.appendChild(newLabel);
															
															time_checkbox.appendChild(document.createElement("br"));
														}
													}

													// Set No Times Available Node
													if (time_checkbox.children.length == 0) {
														var newElem = document.createElement("div");
														newElem.classList.add("sc-italics");
														newElem.classList.add("sc-lightgray");
														newElem.classList.add("sc-marginbottom");
														var newText = document.createTextNode("No times available");
														newElem.appendChild(newText);
														time_checkbox.appendChild(newElem);
													}
												}
												
												// Keep checked boxes checked after submission
												var pref_time_children = document.getElementById('check-time-pref').children;
												var checked_pref_times = [<?php echo "'" . implode("','", $time_pref) . "'";?>];

												for (var i = 0; i < pref_time_children.length; i += 3) {
													for (var j = 0; j < checked_pref_times.length; j++) {
														if (pref_time_children[i].value == checked_pref_times[j]) {
															pref_time_children[i].checked = true;
														}
													}
												}
											</script>
										</div>
									</div>
									<div class='sc-margintop-medium'>
										<input type='submit' value='Continue to Checkout' 
											class='sc-button-pricing-checkout sc-whiter-background sc-lightblue sc-lightbold sc-clickable2 sc-xxxmedium'>
									</div>
									<br>
								</div>
							</form>
						</div>
						
						<!--Completed Info Form-->
						<div id='completed_info_form' class='sc-center' style='display:none;'>
							<div class='sc-notsphone-marginleft sc-notsphone-marginright sc-marginbottom sc-whiter-background sc-rounded-corners sc-shadow-3'>
								<br>
								<div class='sc-pricing-completed-elem'>
									<b class='sc-marginright-small'><?php echo $studentparent?> Name</b>
									<?php echo "<span class='sc-lightgray'>" . $name . "</span>";?>
								</div>
								<div class='sc-pricing-completed-elem'>
									<b class='sc-marginright-small'>Phone Number</b>
									<?php echo "<span class='sc-lightgray'>" . $pnumber . "</span>";?>
								</div>
								<div class='sc-pricing-completed-elem'>
									<b class='sc-marginright-small'>Email Address</b>
									<?php echo "<span class='sc-lightgray'>" . $eaddress . "</span>";?>
								</div>
								<!--Edit Button-->
								<div class='sc-pricing-completed-info-button-container'>
									<button class='sc-pricing-completed-info-button sc-whiter-background' onclick='infoFormToggle()'>
										EDIT
									</button>
								</div>
							</div>
						</div>

						<!--Checkout Stripe Gateway-->
						<?php
							$num_weeks = 4;
							$num_total_sessions = $num_sessions * $num_weeks;
							$prepackage_price = $num_total_sessions * 6500;
							$final_price = $num_total_sessions * 5500;
							$_SESSION["final_price"] = $final_price;
						?>
						<div id='checkout_gateway' style='display:none;'>
							<div class='sc-margintop-xlarge sc-notsphone-marginleft sc-notsphone-marginright sc-marginbottom sc-whiter-background sc-rounded-corners sc-shadow-3'>
								<script src="client.js" defer></script>
								<form id="payment-form" class='sc-payment-form'>
									<div class='sc-pricing-split-checkout-display'>
										<?php
											echo $num_total_sessions . " Sessions, " . $num_weeks . " Weeks";
										?>
									</div>
									<div class='sc-pricing-split-checkout-price sc-right sc-margintop-small'>
										<?php
											echo "<span class='sc-strikethrough sc-italics sc-lightgray'>$" . $prepackage_price/100 . "</span>" ;
											echo "<span class='sc-marginleft-medium'>$" . $final_price/100 . "</span>";
										?>
									</div>
									<div style='margin-top:50px;'>
										<div id="card-element"><!--Stripe.js injects the Card Element--></div>
										<button id="submit" class='sc-payment-button'>
											<div class="spinner sc-hidden" id="spinner"></div>
											<span id="button-text">Pay now</span>
										</button>

										<div style="float:right;" class='sc-margintop-medium'>
											<span class='sc-gray sc-xx5medium'>Secured by</span>
											<img src="../images/Stripe.png" class='sc-pic-stripe' alt='Stripe Logo'>
										</div>

										<p id="card-error" role="alert"></p>
										<p class="sc-payment-result-message sc-hidden">
											Payment successful. Redirecting...
										</p>
									</div>
								</form>
							</div>
						</div>
						
						<!--Info Form Completion Toggle-->
						<script>	
							function infoFormToggle() {
								var info_form = document.getElementById('info_form');
								if (info_form.style.display == 'none') {
									info_form.style.display = 'block';
									document.getElementById('completed_info_form').style.display = 'none';
									document.getElementById('checkout_gateway').style.display = 'none';
								} else if (info_form.style.display == 'block') {
									info_form.style.display = 'none';
									document.getElementById('completed_info_form').style.display = 'block';
									document.getElementById('checkout_gateway').style.display = 'block';
								}
							}
						</script>

						<!--PHP Script Postform-->
						<?php						
							if ($_SERVER["REQUEST_METHOD"] == "POST") {
								if (!empty($nameErr)) {
									echo "<script>document.getElementsByName('name')[0].style.border = '2px solid #ff2929';</script>";
								}
								
								if (!empty($pnumberErr)) {
									echo "<script>document.getElementsByName('pnumber')[0].style.border = '2px solid #ff2929';</script>";
								}

								if (!empty($eaddressErr)) {
									echo "<script>document.getElementsByName('eaddress')[0].style.border = '2px solid #ff2929';</script>";
								}

								if (!empty($referral_nameErr)) {
									echo "<script>document.getElementsByName('referral_name')[0].style.border = '2px solid #ff2929';</script>";
								}

								if (empty($nameErr . $studentparentErr . $pnumberErr . $eaddressErr . $past_referralErr . $referral_nameErr . $num_sessionsErr . $time_prefErr)) {
									echo "<script>infoFormToggle();</script>";

									$_SESSION["name"] = $name;
									$_SESSION["studentparent"] = $studentparent;
									$_SESSION["pnumber"] = $pnumber;
									$_SESSION["eaddress"] = $eaddress;
									$_SESSION["pref_tutor"] = $pref_tutor;
									$_SESSION["past_referral"] = $past_referral;
									$_SESSION["referral_name"] = $referral_name;
									$_SESSION["num_sessions"] = $num_sessions;
									$_SESSION["num_weeks"] = $num_weeks;
									$_SESSION["time_pref"] = implode(", ", $time_pref);

									echo '<script src="https://js.stripe.com/v3/"></script>';
								}
							}
						?>

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
				// Referral Radio
				referralRadio();

				function referralRadio() {
					var past_referralName = document.getElementById("past_referralName");
					if (document.getElementById("referralYes").checked) {
						past_referralName.style.display = 'block';
					} else if (document.getElementById("referralNo").checked) {
						past_referralName.style.display = 'none';
					}
				}
			</script>
		</div>
	</body>
</html>