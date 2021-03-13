all: serve

check: build
	bundle exec htmlproofer ./_site/ --only-4xx --check-html --disable-external --empty-alt-ignore # --check-favicon

serve:
	bundle exec jekyll serve -s . -d _site/

clean:
	rm -rf _outputs/*.{input,output,tmp}
	rm -rf _site/*
	rm -rf docs

build: clean
	bundle exec jekyll build -s . -d docs/

push: build
	git add docs && git commit -m "generated on `date`" && git push

install:
	gem install jekyll
	gem install bundler
	bundle config set path 'vendor/bundle'
	bundle install
