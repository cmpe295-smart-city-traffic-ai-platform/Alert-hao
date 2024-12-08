VERSION=0.0.1

compile:
	mvn clean compile

test:
	mvn clean test

package-jar:
	mvn clean package -Dmaven.test.skip

build-docker-image:
	docker build -t alert_service:$(VERSION) --platform=linux/amd64 .

tag-docker-image-aws:
	docker tag alert_service:$(VERSION) 319282596033.dkr.ecr.us-east-1.amazonaws.com/smart_city_traffic/alert_service:$(VERSION)

push-docker-image-aws:
	docker push 319282596033.dkr.ecr.us-east-1.amazonaws.com/smart_city_traffic/alert_service:$(VERSION)

package-build-docker-image: package-jar build-docker-image

package-build-docker-image-aws: package-jar build-docker-image tag-docker-image-aws push-docker-image-aws
