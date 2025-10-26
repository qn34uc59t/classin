# Как создать SCORM пакет для ClassIn

## Автоматическая сборка (рекомендуется)

1. Запустите скрипт сборки:
```bash
cd "/Users/dgnmd/Downloads/business english"
./build_scorm.sh
```

2. Готово! Файл `business-english-module-scorm.zip` будет создан в корневой директории проекта.

3. Загрузите этот ZIP файл в ClassIn через раздел Drive.

## Загрузка в ClassIn

1. Откройте ClassIn Drive
2. Нажмите **Upload**
3. Выберите файл `business-english-module-scorm.zip`
4. ClassIn распознает его как SCORM пакет
5. Откройте урок - модуль отобразится с полной интерактивностью

## Что включено в SCORM пакет

✅ Все слайды из урока  
✅ Интерактивные чекбоксы для курсов  
✅ Аудио плеер для listening упражнений  
✅ Quizzes и финальная оценка  
✅ Navigation (Previous/Next)  
✅ Progress tracking  
✅ Вся анимация и стили  
✅ SCORM tracking для завершения урока

## Manual сборка (если скрипт не работает)

```bash
# 1. Build проект
npm run build

# 2. Создайте папку scorm_package
mkdir scorm_package

# 3. Скопируйте файлы
cp -r dist/* scorm_package/
cp scorm_api.js scorm_package/assets/
cp imsmanifest.xml scorm_package/

# 4. Создайте manifest.js
cat > scorm_package/assets/manifest.js << 'EOF'
var scorm_version = "1.2";
EOF

# 5. Заархивируйте
cd scorm_package
zip -r ../business-english-module-scorm.zip .
```

## Проверка работы

После загрузки в ClassIn:
- Урок должен открыться в встроенном браузере
- Все кнопки и навигация должны работать
- SCORM API должен отследить завершение урока
- Статус "completed" будет установлен при прохождении последнего слайда

## Troubleshooting

**Проблема:** Файл не распознается как SCORM  
**Решение:** Убедитесь, что файл `imsmanifest.xml` находится в корне ZIP архива

**Проблема:** Урок не отображается корректно  
**Решение:** Проверьте, что все CSS и JS файлы скопированы из `dist/`

**Проблема:** SCORM не отслеживает прогресс  
**Решение:** Это нормально для ClassIn - основное что урок открывается. SCORM tracking работает в полных LMS системах.

