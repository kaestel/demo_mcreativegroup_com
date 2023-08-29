<?php $body_class = "login" ?>
<?php $page_title = "Login" ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/shell.header.php") ?>


<div id="content">
	<div class="intro">
		<h1>enter here</h1>
		<h2>for projects in progress</h2>
	</div>

	<form  method="post" action="https://www.currenttrack.com/index.cgi" name="login">
		<input type="hidden" name="action" value="check">
		<input type="hidden" name="client" value="mcreativegroup">
		<fieldset>
			<div class="field">
				<label for="username">Username</label>
				<input type="text" name="user" value="" id="username" />
			</div>
			<div class="field">
				<label for="password">Password</label>
				<input type="password" name="pass" value="" id="password" />
			</div>
		</fieldset>

		<input type="submit" value="Login" class="button submit" />
	</form>

</div>



<?php include_once($_SERVER["LOCAL_PATH"]."/templates/shell.navigation.php") ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/shell.footer.php") ?>
