<?php $body_class = "contact" ?>
<?php $page_title = "Contact" ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/shell.header.php") ?>

<div id="content">
	<div class="intro">
		<h1>everywhere</h1>
		<h2>you want us</h2>
	</div>

	<p>Drop us an email, follow us on Twitter, check out our Facebook page, or go completely old school and actually give us a call.</p>

	<address class="vcard company" itemscope itemtype="http://data-vocabulary.org/Organization">
		<div class="name fn org" itemprop="name">M Creative Group</div>
		<div class="tel" itemprop="tel"><span>United States: </span><a href="callto:+1760 271 3247">760 930 9244</a></div>
		<div class="tel" itemprop="tel"><span>International: </span><a href="callto:+1760 271 3247">+1 760 930 9244</a></div>
		<div class="email" itemprop="email"><span>Email: </span><a href="mailto:info@mcreativegroup.com">info@mcreativegroup.com</a></div>
	</address>

	<div class="offices">
		<address class="vcard company" itemscope itemtype="http://data-vocabulary.org/Organization">
			<div class="name fn org" itemprop="name"><span>M Creative Group, </span>San Diego</div>
			<div class="adr" itemprop="address" itemscope itemtype="http://data-vocabulary.org/Address">
				<div class="street-address" itemprop="street-address">5946 Priestly Drive, Suite 102</div>
				<div><span class="locality" itemprop="locality">Carlsbad</span>, <span class="region" itemprop="region">CA</span> <span class="postal-code" itemprop="postal-code">92008</span></div>
				<div class="country-name" itemprop="country-name">USA</div>
			</div>
		</address>

		<address class="vcard company" itemscope itemtype="http://data-vocabulary.org/Organization">
			<div class="name fn org" itemprop="name"><span>M Creative Group, </span>New York</div>
			<div class="adr" itemprop="address" itemscope itemtype="http://data-vocabulary.org/Address">
				<div class="street-address" itemprop="street-address">311 W. 43rd Street, Penthouse</div>
				<div><span class="locality" itemprop="locality">New York</span>, <span class="region" itemprop="region">NY</span> <span class="postal-code" itemprop="postal-code">10036</span></div>
				<div class="country-name" itemprop="country-name">USA</div>
			</div>
		</address>
	</div>

</div>

<?php include_once($_SERVER["LOCAL_PATH"]."/templates/shell.navigation.php") ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/shell.footer.php") ?>
