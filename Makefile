.PHONY: start-dev

start:
	npm run start

start-dev:
	npm run start:dev

start-prod:
	npm run start:prod

.DEFAULT_GOAL := start-dev