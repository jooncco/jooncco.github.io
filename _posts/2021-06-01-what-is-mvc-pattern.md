---
title: "[Design Pattern] MVC"
header:
  teaser: /public/images/design-pattern-teaser.png
  og_image: /public/images/design-pattern-teaser.png
category: web
tags:
  - System Design
last_modified_at: 2024-03-10T19:22:00+09:00
---

## 디자인 패턴

객체지향 개발자들이 사용하는 **BP(Best Practices)**를 모아놓은 것. 개발하면서 직면했던 문제들에 대한 해결책을 담고 있으며, 이는 오랜 기간에 걸쳐 **trial & error**를 통해 얻어진 것들이다.

## MVC 패턴이란?

> Model + View + Controller

<img src="/public/images/mvc-figure-1.png"/>

애플리케이션의 구성을 세 가지 관심사로 구분한 패턴이다.  
사용자에게 보여지는 UI와 Business Logic을 분리하여 서로 영향없이 쉽게 고칠 수 있는 애플리케이션을 만들 수 있게 된다.

### 🎈Model

data와 data를 처리하는 부분

- 객체 혹은 Java의 **[POJO](https://en.wikipedia.org/wiki/Plain_old_Java_object)**.
- View 혹은 Controller를 참조하는 내부 속성을 가지면 안된다(직접 수정 방지).
- 변경이 일어났을 때 Controller에 알려주는 부분이 구현되어야 한다.

### 🎈View

화면을 구성해주는 부분

- Model이 가지고 있는 데이터의 표현을 해주는 요소.
- 데이터를 따로 저장하지 않고, 받은 데이터를 단순 표현만 해야한다.
- Model에 질의를 해서 자신을 업데이트하는 부분이 구현되어야 한다.

### 🎈Controller

사용자의 입력을 받고 처리하는 부분

- 사용자의 입력을 받고, validate 하는 역할.
- Model로 흘러가는 data flow를 통제(control)하고, Model에 변경이 일어날때마다 업데이트가 일어날 View를 선택 해준다.
- 이로써 Model과 View를 분리해주는 역할을 한다.
- Model과 View의 변경을 모니터링 한다.

## 동작순서

1. 사용자 입력을 Controller가 감지, validate
2. Controller가 action을 확인하고 business logic을 수행(Model을 조작).
3. Controller에서 해당 action 후에 보여줄 View를 선택
4. View가 Model을 이용하여 화면 표시

Controller의 역할은 보여줄 View를 선택하는것 까지이기 때문에, View는 Model의 메소드를 이용해 데이터를 가져오게 된다.

### View를 업데이트하는 방식 3가지

1. Model class를 직접 사용
2. Model이 자신의 Observer로 등록된 View들에게 notify  
   (**[Observer 패턴](<https://ko.wikipedia.org/wiki/%EC%98%B5%EC%84%9C%EB%B2%84_%ED%8C%A8%ED%84%B4#:~:text=%EC%98%B5%EC%84%9C%EB%B2%84%20%ED%8C%A8%ED%84%B4(observer%20pattern)%EC%9D%80,%ED%95%98%EB%8F%84%EB%A1%9D%20%ED%95%98%EB%8A%94%20%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%8B%A4.>)**).
3. View의 polling을 통한 변경 감지 & 업데이트

## MVC 패턴의 특징

Controller와 View의 관계가 **1:1**이 아닌 **1:N**이다.  
따라서 애플리케이션의 사이즈가 커질수록 Controller의 부담은 늘어만 가고, 이게 병목이 될 수 있다.

<img src="/public/images/mvc-figure-3.png"/>

이런 상황을 풍자해 **Massive ViewController**라고 한다(이니셜은 같네).

그리고 View가 업데이트를 해야할때 Model을 이용하는 구조이기 때문에, Model과 View의 의존성이 높은 패턴이라고 할 수 있다.
