# 정제영 포트폴리오

Astro 기반 정적 포트폴리오. 홈과 KUAD·RAG 챗봇·페인팅 로봇 상세 페이지를 포함합니다.

## 실행
Node.js 22 사용. `npm ci`, `npm run dev` 실행 후 http://localhost:4321 에서 확인합니다. `npm run build`로 dist를 만들고 `npm run preview`로 빌드 결과를 확인합니다.

## 파일
- src/pages/index.astro: 홈
- src/pages/work/: 프로젝트 상세 3종
- src/layouts/style.css: 반응형 디자인
- docs/제작-지침서.md: 제작·운영 기준


## GitHub Pages

사이트: https://jayyeong.github.io/
저장소: https://github.com/jayyeong/jayyeong.github.io

main에 push하면 GitHub Actions가 의존성 설치 → 빌드 → 내부 링크·이미지 검사 → Pages 배포를 수행합니다. PR에서는 빌드와 검사만 실행합니다. 배포 실패 시 이전에 성공한 사이트가 유지됩니다.

## 수정하고 배포하기

1. 파일을 수정하고 `npm run build`와 `npm run check:site`로 확인합니다.
2. `git add .`로 수정 파일을 선택합니다.
3. `git commit -m "Update portfolio"`로 변경을 기록합니다.
4. `git push origin main`으로 올립니다. Actions에서 성공 여부를 확인합니다.

변경을 검토하고 반영하려면 별도 브랜치에서 PR을 만든 뒤 main으로 병합합니다. main의 과거 변경으로 복구할 때는 `git revert <commit>` 후 push합니다. 저장소의 Actions → Build and deploy portfolio → Run workflow로 수동 재배포도 가능합니다.

Node.js 22 환경을 사용합니다. 도메인 구매나 유료 서버 없이 GitHub의 기본 주소와 공개 저장소로 운영합니다.
