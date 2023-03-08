install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

link:
	sudo npm link

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test --coverage