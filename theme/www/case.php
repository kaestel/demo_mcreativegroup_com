<?php $body_class = "work" ?>
<?php $page_title = "Case" ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/shell.header.php") ?>

<div id="content">
	<div class="intro">
		<h1>insight inspired content</h1>
		<h2>to create awareness and influence behavior</h2>
	</div>

	<div class="case">
		<div class="thumbnail">
			<a href="/case"><img src="/img/temp_pi_case_1_small.jpg" alt="Reynolds" /></a>
		</div>
		<dl>
			<dt class="client">Client</dt>
			<dd class="client">Reynolds</dd>
			<dt class="project">Project</dt>
			<dd class="project">Name goes here</dd>
			<dt class="logo">Logo</dt>
			<dd class="logo"><img src="/img/logo_reynolds.jpg" alt="Reynolds" />
			<dt class="description">Description</dt>
			<dd class="description">
				<p>Lorem ipsum dolor sit amet, consectetur od tempor incididunt ut consect dolore ipsum sit amet concorde labore sit loremet ipsum dolor sit amet.</p>
				<p>Consec teturidunt ut labore et doorem ipsum dolor sit aod tedunt ut labore et dolor.</p>
			</dd>
		</dl>
		<div class="movie">
			<a href="/movies/case_1.mp4" class="normal">View normal</a>
			<a href="/movies/case_1_large.mp4" class="large">View larger</a>
		</div>
	</div>

</div>

<?php include_once($_SERVER["LOCAL_PATH"]."/templates/shell.navigation.php") ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/shell.footer.php") ?>
