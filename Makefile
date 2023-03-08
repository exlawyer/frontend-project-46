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
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage