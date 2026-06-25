rm src/index.css
rm src/App.css

mkdir src/components

mv theme.jsx src/theme.jsx
mv App.jsx src/App.jsx

npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material

sed -i "/import '\.\/index\.css'/d" main.jsx

rm public/icons.svg
rm src/assets/*