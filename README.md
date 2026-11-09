# 참외농가 도우미 웹앱 v1.0

무료·DB 없음·서버 없음. HTML/CSS/JS 정적 웹앱 + PWA. 개인 정식일과 메모는 스마트폰 브라우저 localStorage에만 저장됩니다. 브라우저 데이터 삭제 시 사라집니다.

## 스마트폰에서 GitHub Pages 배포
1. 이 ZIP을 내려받아 압축을 해제합니다.
2. GitHub 저장소 `fox4829/seongju-melon-farmer`에 **압축파일 자체가 아니라 압축 해제한 파일과 폴더**를 올립니다. `index.html`이 저장소 최상위에 있어야 합니다.
3. 스마트폰에서 폴더 구조를 보존하려면 Termux에서 `pkg install git unzip`, `termux-setup-storage`를 수행한 뒤 ZIP을 해제하고 `git add .`, `git commit`, `git push`로 업로드하는 방법이 편리합니다. GitHub 웹 업로드도 가능하나 `.github/workflows/pages.yml` 폴더 구조를 반드시 유지하세요.
4. 저장소 Settings > Pages > Build and deployment > Source를 **GitHub Actions**로 선택합니다.
5. Actions > Deploy static web app to GitHub Pages > Run workflow를 실행하거나 main에 push합니다.
6. 성공 시 `https://fox4829.github.io/seongju-melon-farmer/`에서 접속합니다.
7. Chrome 메뉴 > 홈 화면에 추가/앱 설치를 선택합니다.

## 로컬 테스트
`python -m http.server 8000` 실행 후 http://localhost:8000 에 접속합니다. PWA 설치는 HTTPS 배포 또는 localhost에서 동작합니다.

## 한계 및 주의
- 실제 경매가격 API와 기상청 API는 아직 미연동입니다. 공식 사이트 링크를 제공합니다.
- 재배 단계의 날짜 구간은 **UI 작동을 보여주는 예시**이며 공식 농업기술 기준이나 방제 처방이 아닙니다. 실제 생육과 지역 전문가 지도를 우선하세요.
- 농약 등록 여부·안전사용기준은 공식 농약안전정보시스템에서 확인하세요.
- PWA 오프라인 사용은 최초 온라인 접속 후 내부 페이지와 정적 콘텐츠에 한정됩니다. 외부 기관 사이트는 오프라인에서 열리지 않습니다.
- 이 앱은 성주군청/농협 공식 앱이 아닙니다.
- GitHub Pages 무료 제공 조건은 계정/저장소 정책을 확인하세요. 개인 Free 계정에서는 공개 저장소 사용이 일반적입니다.
