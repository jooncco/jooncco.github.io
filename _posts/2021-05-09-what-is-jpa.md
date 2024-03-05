---
title: "[Java] JPA가 뭐에요"
header:
  teaser: /public/images/jpa-teaser.png
  og_image: /public/images/jpa-teaser.png
category: web
tags:
  - Back End
toc: true
toc_sticky: true
last_modified_at: 2022-03-27T10:24:00+09:00
---

Java Persistence API

## JPA 란

"The java `ORM standard` for storing, accessing, and managing java objects in a relational database"

<img src="/public/images/jpa-figure-1.png"/>

- Java에서 정의한 **API**이며, **ORM 표준**이자 **스펙**이다.
- 구현체가 아니기 때문에 자체로서 어떤 동작을 하지 않는다.  
- 대표적인 구현체로 [Hibernate](https://hibernate.org/) 가 있으며 java의 객체와 DB 테이블을 매핑한다.
- 일부 JPA 구현체는 NoSQL DB도 지원한다([EclipseLink](https://www.eclipse.org/eclipselink/)).

<br/>

> **JDBC**: Java DataBase Connectivity  
> 
> <img src="/public/images/jpa-figure-3.png"/>  
> DB와 Java 앱 사이의 커넥션을 관리하고, 쿼리를 전달하기 위해 정의된 **Java의 API**.
> 거의 모든 Java 기반의 Data Access Layer에서 내부적으로 쓰고있다고 보면 된다.
> JPA 역시, 결국엔 JDBC를 통해 Persistence Layer에 접근한다.

<br/>

## ORM과 SQL Mapper의 차이

### ORM (Object-Relational Mapping)

**_Object \\(\leftrightarrow\\) Relation(Tables)_**  
객체와 테이블 데이터 사이의 패러다임 불일치를 해결해준다.  
객체를 통해, 애플리케이션 코드 상에서 간접적으로 DB 데이터를 다루게 해준다.  
개발자가 SQL을 직접 작성하지 않아도 SQL문을 자동으로 생성해준다.  
대표적인 구현체로 [Hibernate](https://hibernate.org/)가 있다.

### SQL Mapper

**_Repository의 메소드 \\(\leftrightarrow\\) SQL문_**  
개발자는 xml 형태로 SQL을 직접 작성해야 한다.  
작성한 SQL 문은 애플리케이션 repository의 메소드와 매핑된다.  
DBMS가 변경될 경우 애플리케이션 코드 또한 변경이 필요하다.  
대표적인 구현체로 [Mybatis](https://mybatis.org/mybatis-3/), [JdbcTemplate](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html)가 있다.

<br/>

> **Note.**  
이 둘은 애플리케이션의 **Persistence Layer**를 구성한다.

> **Persistence Layer**  
데이터에 영속성(Persistence)을 부여해주는 계층.  
JDBC를 사용해 직접 low-level에서 구현도 가능하지만, 보통 Persistence 프레임워크(ORM, SQL Mapper)를 사용한다.

<br/>

## JPA의 장점

1. 개발자는 JPA에게 SQL을 맡기고 **비즈니스 로직**에 집중할 수 있다.
2. DB Vendor 종속성이 없기 때문에, 애플리케이션 소스코드의 변경 없이 DBMS를 변경 할 수 있다.
3. **객체**를 통해 **쿼리**를 작성할 수 있는 **JPQL(Java Persistence Query Language)**를 지원한다.
4. **최적화**(lazy loading, caching, write behind 등)로 인한 이점을 누릴 수 있다.

<br/>

## JPA에서의 영속성

<img src="/public/images/jpa-figure-2.png"/>

JPA는 영속성 구현을 위해 **영속성 컨텍스트**라는 것을 관리한다.  
JPA의 **Entity Manager**가 활성화된 상태로, 트랜잭션(`@Transactional` 어노테이션이 달린 스코프) 안에서 Entity로 관리되는 class의 객체가 선언되어 있다고 가정하자.  

이때, 이 객체의 **영속성 컨텍스트**가 유지되며, 이 상태에서 멤버변수의 값을 변경하면 트랜잭션이 끝나는 시점에 해당 객체가 매핑된 **테이블 컬럼**의 데이터가 업데이트 된다(소스코드 상에서 `update()`메서드를 호출하지 않아도 업데이트는 일어나며, 이를 `Dirty check`이라고 한다).

- Spring Data JPA를 사용하면, 기본적으로 **Entity Manager**는 활성화된다.  
- **영속성 컨텍스트**는 엔터티를 담고있는 집합이며, 직접 접근은 불가능하다(Entity Manager를 통해서만 접근).

<br/>

## JPA 동작과정

<img src="/public/images/jpa-figure-5.png"/>

개발자가 **JPA의 API 메소드**를 호출하면 JPA는 **쿼리**를 생성하고, 그 쿼리는 **JDBC의 API**에 의해 형성된 DB 커넥션을 통해 전달된다.


### insert()

<img src="/public/images/jpa-figure-6.png"/>

코드 상에서 **Member 객체**를 `insert()` 메소드의 인자로 넘기면

1. Memger 객체 분석
2. INSERT SQL 생성 (DBMS의 Dialect 반영)
3. JDBC API 호출  

순서로 동작한다.

<br/>

### find()

<img src="/public/images/jpa-figure-7.png"/>

코드 상에서 **Member 객체**의 `id`를 `find()` 메소드의 인자로 넘기면

1. SELECT SQL 생성 (DBMS의 Dialect 반영, WHERE 절에 인자 조건 추가)
2. JDBC API 호출
3. 조회된 데이터를 Member 객체의 필드에 담아 반환

순서로 동작한다.

<br/>

## JPA가 알아서 해주는 최적화

JPA 또한 **미들웨어**이며, 미들웨어는 보통 아래 2가지 방법으로 성능 개선을 도모한다.

1. `Buffering`을 통한 **overhead** 최소화  
2. `Caching`을 통한 **query** 성능 향상  

무슨 얘긴지 간단히 살펴보자.

### 1. Buffering
: 쓰기 지연(transactional write-begind)

#### insert()

```java
public void jpaExampleService() {
  transaction.begin();

  jpaRepository.save(entityA);
  jpaRepository.save(entityB);
  // 여기까지는 entityA, entityB와 관련된 테이블 데이터에 변경이 없다.

  transaction.commit(); // DB connection이 이때 할당되고 테이블 데이터가 변경된다.
}
```

#### update()

```java
public void jpaExampleService() {
  transaction.begin();

  jpaRepository.update(entityA);
  jpaRepository.delete(entityB);
  // 여기까지는 entityA, entityB와 관련된 DB 테이블 데이터에 변경이 없다.
  doBusiness(); // 비즈니스 로직을 수행하는 동안 DB lock이 발생하지 않는다.

  transaction.commit(); // DB lock을 이때 획득. 변경사항이 테이블 데이터에 반영된다.
}
```

<br/>

### 2. Caching
: 1차 캐시

```java
public void jpaExampleService() {
  String entityId= "sameId";
  
  Entity instanceA, instanceB;
  instanceA= jpaRepository.find(Entity.class, entityId); // entity 조회
  instanceB= jpaRepository.find(Entity.class, entityId); // cached retrieval

  boolean isInstanceSame= instanceA == instanceB; // true
}
```

<br/>

### 3. Lazy loading (지연 로딩)
: 데이터가 **실제로 사용되는 시점**까지 조회를 미루는 전략

`Team` : `Member` = 1 : N 관계라고 하자.  
`Member` 엔터티는 멤버변수로 `Team` 엔터티의 PK를 FK로 갖는다.

```java
public void jpaExampleService() {
  Member member = memberRepository.find(memberId);
  // SELECT * FROM member WHERE member_id = memberId;

  Team team = member.getTeam();
  // No SQL executed here

  String teamName = team.getName();
  // SELECT * FROM team WHERE team_id = member.teamId;
}
```

그런데 이렇게 되면 쿼리 전달을 위한 DB connection overhead가 두 번 발생하기 때문에 `Eager Loading(즉시 로딩)` 방식이 성능상 더 이득일 때(Member 데이터를 사용할때 대부분 Team 데이터도 사용되는 경우)가 있다. 판단은 엔지니어의 몫이다.

<br/>

### 4. Eager loading (즉시 로딩)
: 연관된 객체들을 모두 **미리 조회**하는 전략

```java
public void jpaExampleService() {
  Member member = memberRepository.find(memberId);
  // SELECT * FROM member JOIN team WHERE member.teamId = team.teamId;

  Team team = member.getTeam();
  // No SQL executed here

  String teamName = team.getName();
  // No SQL executed here
}
```

<br/>

> **Note.**  
`Lazy loading`을 default로 설정한 후에, 개발·운영을 진행하면서 비즈니스 로직의 동작을 살펴본 뒤에 선택적으로 `Eager loading`으로 옵션을 변경하는 것이 현명하다.

<br/>

## 정리하며. Spring Data JPA

<img src="/public/images/jpa-figure-13.png"/>

JPA와 `Spring Data JPA`는 엄연히 다르다.

`Spring Data JPA`는 JPA 구현체를 쉽게 사용하기 위해 Spring framework에서 제공하는 일종의 **프레임워크**이며, **JPA 구현체** 및 **저장소**를 application 설정으로 쉽게 교체할 수 있게 해준다.

- Java의 Redis 클라이언트가 Jdis에서 Lettuce로 대세가 바뀔 때 **Spring Data Redis**를 사용하고 있었다면 손쉽게 교체가 가능했다.
- Spring Data JPA, Spring Data mongoDB, Spring Data Redis등 **Spring Data** 프로젝트의 하위 프로젝트들은 동일한 **인터페이스**(findAll, save 등등 ..)를 구현하기 때문에, **저장소**를 교체해도 **소스코드**를 수정할 필요가 없다.
