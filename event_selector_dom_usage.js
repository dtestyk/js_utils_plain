var es = event_selector()
.append({type: 'aaa bbb cc', time: 1},['time'])
.append({type: 'xxxx bbb cc', time: 2, x: 'n'},['time','x'])
.append({type: 'xxxx bbb cc', time: 2, x: 'p'},['time','x'])
.append({type: 'xxxx bbb cc', time: 3, x: 'p'},['time','x'])

es.listen(document, 'click')
es.listen(document, 'keydown')

es.query('.aaa .xxxx[time="2"][x="p"]')
es.query('.aaa .xxxx[time="2"]:not([x="p"])')

es.query('.aaa .click')


es.clear()

es.query('.click .keydown[which="32"]')