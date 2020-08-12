const html = `<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
         body {  font-family: sans-serif; } pre { background-color: #eeeeee; padding: 1em; white-space: pre-wrap; } .note { font-style: italic; color: #777; } a:link, a:visited { color: #258aaf; text-decoration: none; } a:hover, acronym:hover { color: #7aa1b0 !important; } .content { width: auto;}
    </style>
</head>
<body>
<div class="content"><span class="note">(Hệ thống cảm biến điện tử trên sân sát hạch tại Trung tâm sát hạch sẽ thực hiện chấm điểm tự động, nếu không bị lỗi thì điểm tối đa là 100 điểm. Điểm đậu là từ 80 điểm trở lên).<br/>Tổng thời gian toàn bộ bài thi là 15 phút, thời gian mỗi bài thi sẽ được tính từ khi vào bài thi (vạch màu trắng trên đường) đến khi ra khỏi bài thi.</span>
    <h2><a name="tableOfContents">Có 10 bài thi chính và 2 bài thi phụ:</a></h2>
    <ol>
        <li><a href="#bai1">Xuất phát</a></li>
        <li><a href="#bai2">Dừng xe nhường đường cho người đi bộ.</a></li>
        <li><a href="#bai3">Dừng xe, khởi hành trên dốc lên (thường gọi là đề-pa lên dốc).</a></li>
        <li><a href="#bai4">Đi xe qua hàng đinh.</a></li>
        <li><a href="#bai5">Đi xe qua đường vuông góc (chữ Z).</a></li>
        <li><a href="#bai6">Đi xe qua đường vòng quanh co (chữ S).</a></li>
        <li><a href="#bai7">Ghép xe vào nơi đỗ (lùi nhà xe).</a></li>
        <li><a href="#bai8">Dừng xe nơi giao nhau với đường sắt.</a></li>
        <li><a href="#bai9">Tăng tốc, tăng số.</a></li>
        <li><a href="#bai10">Kết thúc.</a></li>
        <li><a href="#bai11">Bài phụ: Dừng xe nguy hiểm.</a></li>
        <li><a href="#bai12">Bài phụ: Qua ngã tư có tín hiệu điều khiển giao thông.</a></li>
    </ol>
    <p/>Khi lái xe trong sa hình bạn cần phải đi chậm, thật chậm. Đi chậm sẽ giúp ta đánh lái được
    chính xác, không vội vàng (khi qua chữ Z, chữ S, lùi vào ga ra), có thời gian căn chỉnh bánh xe
    khi đi vào hàng đinh, dừng đúng chỗ và nhẹ nhàng tại điểm dừng xe nhường đường cho người đi bộ,
    trên dốc và trước đường sắt.<p/>Các xe thi thường để ga-răng-ti cao nên vào số 1, không đặt vào
    chân ga thì xe đi cũng đã khá nhanh. Vì vậy muốn xe đi chậm thì phải đỡ được côn, tức là chân
    trái ấn côn vào sâu gần hết (không ấn hết côn) và giữ nguyên ở mức đó cho đến khi xe đi chậm như
    mình mong muốn. Đỡ được côn và rà phanh sẽ giúp bạn điều khiển chiếc xe được theo ý mình.<p/>
    <h2><a name="bai1">Bài 1. Xuất phát</a></h2>Trước lúc xuất phát, khi mới lên xe, bạn cần :
    <ul>
        <li>Kiểm tra lại ghế ngồi xem có phù hợp với người không, nếu cần thiết thì chỉnh xa vành
            tay lái hoặc gần lại để đạp hết được côn, phanh, ga.
        </li>
        <li>Kiểm tra hai gương sao cho nhìn thấy được điểm bánh xe sau tiếp xúc với mặt đường.</li>
        <li>Cài dây an toàn, để máy nổ và chờ lệnh xuất phát.</li>
        <li>Khi có lệnh xuất phát (Đèn màu xanh trong xe bật sáng, loa phát lệnh “Xe số xxx xuất
            phát”), bạn thực hiện như sau:
        </li>
        <ul>
            <li>Bật đèn xi–nhan trái.</li>
            <li>Vào số 1, nhả côn từ từ để xe đi.</li>
            <li>Khi đèn xanh trong xe tắt hoặc khi qua vạch xuất phát khoảng 5 m thì tắt đèn
                xi-nhan.
            </li>
            <li>Khi xe đã đi, bạn có thể nhả hết côn ra cho xe tự bò, không cần đặt chân vào bàn đạp
                ga. Và đi đến bài số 2.
            </li>
        </ul>
    </ul>
    <h3>Các lỗi:</h3><h5>Lỗi nhẹ: (Mỗi lỗi trừ 5 điểm)</h5>
    <ul>
        <li>Không thắt dây an toàn.</li>
        <li>Không bật đèn xi nhan trái khi xuất phát.</li>
        <li>Không tắt đèn xi nhan sau khi xe qua vạch xuất phát 5m.</li>
        <li>Quá 20 giây sau khi có lệnh xuất phát (đèn xanh sáng) mà xe chưa đi qua vạch xuất
            phát.
        </li>
        <li>Xe chết máy khi đã có lệnh xuất phát.</li>
        <li>Để tốc độ động cơ quá 4000 vòng/phút (Đạp ga quá lớn).</li>
    </ul>
    <h5>Lỗi nặng: (Bị loại)</h5>
    <ul>
        <li>Quá 10 giây mà xe chưa qua được vạch xuất phát.</li>
        <li>Gây tai nạn.</li>
    </ul>
    <a href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai2">Bài 2. Dừng xe nhường đường cho người đi bộ</a></h3> Yêu cầu của bài này là
    dừng xe đúng chỗ trước vạch trắng và đường vằn dành cho người đi bộ (cản xe phía trước cách vạch
    dừng không quá 0,5m).<p/>Đỗ già quá (chạm vào vạch trắng) hoặc non quá (quá xa vạch trắng) đều
    bị trừ 5 điểm.<p/>Các sân thi thường "giúp" học viên bằng cách đánh dấu sẵn bằng vạch trên cọc
    biển báo hiệu. Nếu khi vai người lái xe (hoặc Nút chốt cửa hoặc vạch trên cửa xe) đến ngang cọc
    đó thì phải dừng.<p/>Sau khi xuất phát, bạn để xe đi chậm. Khi xe vừa tới vị trí thì đạp côn và
    ấn nhẹ phanh là xe dừng.<p/>Dừng xe xong, bạn lại nhả côn cho xe đi tiếp luôn. Dừng lâu quá 30
    giây sẽ bị trừ điểm.<p/><span class="note"><b><u>Mẹo</u></b>: Cách điểm đến 5m, đạp hết côn cho xe chạy từ từ theo đà, để sẳn chân trên thắng (phanh), vươn người để đưa tầm mắt ngang với vạch trên cửa xe và ngắm ra vạch trên sân thi, khi thấy thẳng hàng thì đạp mạnh châng thắng (chân phanh). Mẹo này áp dụng cho cả bài thi qua đường sắt và bài thi lên dốc nếu muốn ăn trọn điểm.</span>
    <h4>Các lỗi:</h4> <h5>Lỗi nhẹ: (mỗi lỗi trừ 5 điểm)</h5>
    <ul>
        <li>Dừng xa vạch (quá 0,5 m).</li>
        <li>Dừng quá vạch.</li>
        <li>Xe chết máy.</li>
        <li>Để tốc độ động cơ quá 4000 vòng/phút (Đạp ga quá lớn).</li>
    </ul>
    <h5>Lỗi nặng: (Bị loại)</h5>
    <ul>
        <li>Quá 30 giây mà xe chưa qua được vạch xuất phát.</li>
        <li>Gây tai nạn.</li>
    </ul>
    <a href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai3">Bài 3. Dừng xe, khởi hành ngang dốc</a></h3>Yêu cầu của bài này là xe không
    vượt quá vạch quy định, không bị tuột dốc quá 50 cm, phải vượt khỏi dốc trong khoảng thời gian
    30 giây (nếu bị các lổi này sẽ bị loại).<p/>Không được tăng ga quá lớn (số vòng quay động cơ
    trên quá 3 hoặc 4 nghìn vòng/phút). Chính vì nếu vượt quá vạch quy định là bị loại ngay nên
    nhiều người đành phải đỗ non khi chưa đến đúng vị trí, chấp nhận mất 5 điểm cho chắc ăn.<p/>Sau
    khi qua bài 2, bạn nhả hết côn, phanh cho xe tự bò lên dốc. Về bản chất, bài này giống bài 2 ở
    chỗ dừng xe rồi lại đi tiếp. Nhưng vì xe đang ở trên dốc nên bạn không thể đỡ côn cho xe đi chậm
    lại vì nếu đỡ côn thì xe sẽ bị trôi ngược về chân dốc. Vì thế, chỉ có thể nhắm đúng vị trí cần
    đỗ (qua vạch đỏ trên ta-luy hoặc mặt đường) để đạp côn, phanh đúng lúc.<p/>Nếu như ở bài 2, sau
    khi dừng xe, để đi tiếp bạn chỉ việc bỏ chân phanh ra rồi mới từ từ nhả côn. Nhưng ở bài 3 thì
    không thể làm như vậy vì xe đang trên dốc, bỏ phanh chân ra thì xe sẽ trôi. Do vậy cách xử lý ở
    bài 3 khác bài 2.<p/>
    <p>Có hai cách xử lý:</p>
    <ul>
        <li>Cách 1: Là cách dạy chính thống trong trường. Sau khi xe đã dừng trên dốc, bạn kéo phanh
            tay với mục đích là thay phanh chân giữ xe tại điểm dừng. Khi đó, bạn có thể bỏ chân
            phanh ra và đặt vào chân ga mớm lên. Đồng thời chân trái nhả côn từ từ, đến khi thấy tay
            lái hoặc cần số rung lên (báo hiệu các lá côn đã bắt vào nhau) thì nhả nhẹ phanh tay,
            nghe ngóng nếu thấy xe không trượt thì thả nốt phanh tay, xe sẽ tự bò lên.
        </li>
        <li>Cách 2: Là cách các lái già thường làm trong thực tế, không dùng đến phanh tay.<br/>Sau
            khi canh cho núm cửa gần tới ngang cọc biển báo vạch xe dừng thì bạn đạp côn, thắng dừng
            xe.<br/>Sau đó bạn nhả côn từ từ (thật chậm), đến khi thấy tay lái hoặc cần số rung rung
            thì nhả nhẹ phanh chân, nghe ngóng. Nếu cảm thấy xe trôi thì đạp phanh vào, làm lại. Nếu
            thấy xe không trượt thì thả cho hết phanh chân, xe sẽ tự bò lên. Nếu nhả hết phanh chân
            mà xe vẫn đứng yên thì tiếp vào chân ga một chút, đồng thời hơi nhả côn ra thêm. (Chú ý
            nếu nhả côn nhanh quá xe có thể bị tắt máy (bị trừ điểm). Bạn phải nhanh chóng đề xe lại
            và tiếp tục bài)Khi xe đã đi thì giữ nguyên vị trí chân côn và ga cho đến khi xe qua
            khỏi đỉnh dốc. Nhiều người mới học lại thấy cách làm này dễ hơn cách 1, vì không cần
            dùng đến phanh tay mà chỉ tập trung vào hai chân điều chỉnh côn, phanh (thực tế khi hạ
            phanh tay, những người chưa quen có thể bị choạng tay lái hoặc ấn mạnh vào bàn đạp ga
            làm rú ga).
        </li>
    </ul>
    <span class="note"><b><u>Chú ý</u></b>: Vì bài này nếu để xe quá vạch quy định bị loại luôn, để an toàn các bạn nên cho dừng xe sớm trước vạch chấp nhận bị trừ 5 điểm.</span>
    <p/><a href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai4">Bài 4. Đi xe qua hàng đinh</a></h3>Yêu cầu của bài này là hai bánh xe bên
    phải phải đi lọt qua một đoạn đường có bề rộng khoảng 30-35 cm (dấu B). Mỗi lần bánh xe chạm
    vạch là bị trừ 5 điểm (Mỗi 2 giây).<p/>Khi rẽ vào đường đi hàng đinh, bạn nên đánh lái muộn một
    chút để xe áp sát lề đường bên phải xe. Đi thật chậm và nhìn gương phải để quan sát bánh xe phía
    sau. Các sân thi thường kẻ sẵn vạch để giúp học viên căn đường. Vạch này bằng với mép ngoài của
    hàng đinh. Vì vậy, nếu bánh xe cách vạch đỏ khoảng 10-15 cm thì nhiều khả năng xe sẽ đi qua hàng
    đinh mà không chạm mép hai bên.<p/>Ngoài việc nhìn gương phải, bạn cũng phải căn và bám vào một
    điểm mốc ở phía trước, thường là một vạch đánh dấu trên lề đường trước mặt. Vì có khi lúc đầu xe
    đi đúng khoảng cách với vạch căn bên phải, nhưng sau đó do giữ lái không tốt nên xe bị chệch
    hướng.<p/><span class="note"><b><u>Chú ý</u></b>: Nếu bánh xe bên phải đi ngoài hàng đinh thì sẽ bị loại.</span>
    <p/><a href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai5">Bài 5. Đi xe qua đường vuông góc (chữ Z)</a></h3>Yêu cầu của bài này là khi
    cho xe đi không bị chạm vạch ở gần vỉa hè hai bên đường, nếu chạm vạch trừ 5 điểm. Bạn phải đi
    thật chậm khi vào vuông góc (bằng cách ép côn một phần (Vê côn) để đánh tay lái kịp thời.<p/>Sau
    khi đi qua hàng đinh, bạn thấy gương chiếu hậu ngang với góc bên trái thì đánh hết lái sang trái
    đồng thời quan sát gương chiếu hậu và trả lái phù hợp để thành xe song song với vạch giới hạn và
    cách 30-40cm khi song song thì trả thẳng lái tiến đến góc vuông thứ 2.<p/>Qua sát khi thấy gương
    chiếu hậu bên phải ngang với góc thứ 2 bên phải thì đánh hết lái sang phải đồng thời quan sát
    gương chiếu hậu và trả lái phù hợp để thành xe song song với vạch giới hạn và cách 30-40cm khi
    song song thì trả thẳng lái tiến ra khỏi hình.<p/>Để có thể đánh hết lái và trả lái cho nhanh,
    trong quá trình học bạn nên tập cho thuần thục động tác xoay vô-lăng. Phương pháp hiện nay là
    khi rẽ bên phải thì tay trái sẽ là tay chính, không rời khỏi vô-lăng trong suốt lúc xoay, còn
    tay phải chỉ dùng để kéo vành lái phía bên phải nhằm hỗ trợ khi tay trái di chuyển xuống điểm
    dưới của vô-lăng (lúc đó lực xoay của tay trái không được mạnh). Đối với rẽ trái thì quá trình
    ngược lại, tay phải là tay xoay chính, tay trái hỗ trợ. Khi trả lái cũng tương tự.<p/><a
            href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai6">Bài 6. Đi xe qua đường vòng quanh co (chữ S)</a></h3>Yêu cầu của bài này
    giống bài 5 (mỗi lần bánh xe chạm vạch trừ 5 điểm).<p/>Khác với bài 5, do chữ S là đường cong
    liên tục nên bạn phải điều chỉnh tay lái theo đường cong. Các lái xe có câu "Tiến bám lưng, lùi
    bám bụng", có nghĩa là khi xe vào đường cua (ôm cua) nên căn theo phía đường cong dài hơn. Như
    vậy, khi vào đường chữ S, bạn cho xe bám sát về bên phải, đánh lái sang trái cho xe đi nửa vòng
    cua đầu tiên, sau đó lại bám sang lề đường bên trái, trả lái và đánh lái sang phải cho xe qua
    nốt nửa vòng cua còn lại.<p/><a href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai7">Bài 7. Ghép xe vào nơi đỗ (lùi vào nhà xe)</a></h3>Yêu cầu của bài này là
    trong vòng 2 phút bạn phải cho xe lùi được vào nơi đỗ (nhà xe), không chạm vạch và tiến ra khỏi
    nhà xe.<p/><h4>Các lỗi:</h4>
    <ul>
        <li>Mỗi lần bánh xe chạm vạch trừ 5 điểm (mỗi 2 giây)</li>
        <li>Quá thời gian 2 phút trừ 5 điểm (Mỗi 2 phút trừ 5 điểm)
        <li>
        <li>Bánh xe không chạm được vạch kiểm tra cuối nhà xe bị loại (Máy không báo)
        <li>
        <li>Không hạng xe bị loại (nhầm nhà xe hạng xe khác)
        <li>
    </ul>
    Khi bắt đầu rẽ vào khu vực nhà xe, bám sát lề đường bên trái cách khoảng (30 cm – 50cm). Đi
    chậm(Số 1) khi (vai người lái) đi ngang qua cửa nhà xe thì đánh hết lái về bên phải, tiếp tục
    cho xe tiến lên khi thấy thân xe có góc khoảng 40-45 độ so với đường ngang cửa nhà xe thì trả
    thẳng lái và dừng lại trước vạch giới hạn.<p/>Sau đó nhìn kiếng chiếu hậu bên trái quan sát phía
    sau (bánh xe, thân xe và góc nhà xe) - xem thế xe rồi vào số lùi, tùy theo thế xe “lơi “ hay
    “dốc “ mà ta đánh tay lái sang trái nhiều hay ít, điều chỉnh sau cho bánh xe sau khi lùi vào
    cách góc nhà xe khoảng 10-15 cm – khi bánh xe sắp đến góc nhà xe thì đánh nhiều lái sang trái
    cho xe lùi vào bên trong nhà xe – quan sát thấy thành xe, bánh xe song song với nhà xe và cách
    vạch giới hạn 20cm -30 cm thì trả thẳng lái và lùi vào cho đến khi bánh xe sau đè lên vạch kiểm
    tra và nghe máy báo “Đã kiểm tra“ thì dừng lại.<p/>Cài số 1 và tiến ra khỏi nhà xe.Lưu ý khi
    tiến ra, người phải ra khỏi cửa nhà xe hoặc hơn một chút nữa bạn hãy đánh lái rẽ sang phải để
    tránh trường hợp bánh sau chưa ra khỏi cửa nhà xe mà đã rẽ sẽ bị chèn vạch, trừ điểm.Nếu lỡ lùi
    chưa chính xác, đuôi xe cách xa cửa nhà xe, có thể chèn lên vạch hoặc vỉa ba-toa, bạn cứ bình
    tĩnh về lại số 1, tiến lên phía trước, đánh lái sao cho xe ở vào vị trí thẳng trước cửa nhà xe,
    sau đó vào số lùi để làm lại việc lùi vào nhà xe. (Gọi là lùi xe 2 đỏ)<p/><a
            href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai8">Bài 8. Dừng xe nơi giao nhau với đường sắt</a></h3>Yêu cầu và thực hành của
    bài này giống bài 2.<p/><a href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai9">Bài 9. Tăng tốc, tăng số</a></h3>Yêu cầu của bài này là phải lên được số 2 và
    đạt tốc độ trên 20 km/h trước biển báo 20 màu xanh (biển báo tốc độ tối thiểu phải đạt 20 km/h),
    sau đó lại phải về số 1 và giảm tốc độ xuống dưới 20 km/h trước biển báo 20 màu trắng (biển báo
    tốc độ tối đa không quá 20 km/h).<p/>Sau khi qua nơi giao nhau với đường sắt, bạn rẽ sang đường
    chuẩn bị tăng tốc. Chỉnh lái cho xe thẳng, giữ chắc tay lái, nhả hết côn, phanh. Qua biển "Tăng
    số, tăng tốc" (Bảng vuông) Nhấn ga để xe tăng tốc,rồi khẩn trương sang số 2, tiếp tục nhấn ga
    tiếp (nữa ga là đủ đạt tốc độ). Qua biển 20 màu xanh,nhả ga, rà phanh, cho xe đi chậm lại, thậm
    chí dừng hẳn, về số 1 từ từ để xe đi qua biển 20 màu trắng.<p/>Chú ý là bạn không được cắt côn
    để xe trôi từ từ qua biển 20 màu trắng, vì yêu cầu ở đây là bạn phải đi qua biển này khi xe có
    gài số. Vì thế nếu bạn cắt côn làm bánh răng số không quay thì sẽ bị trừ 5 điểm.<p/><a
            href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai10">Bài 10. Kết thúc</a></h3>Yêu cầu của bài này là đi thẳng qua vạch kết thúc,
    trước đó phải bật đèn xi-nhan phải (với ý nghĩa là xe tấp vào lề đường bên phải, chuẩn bị dừng
    hoặc đỗ xe).<p/>Sau khi vòng qua ngã tư lần cuối cùng, bạn chỉnh xe cho thẳng và để xe đi từ từ
    về vạch xuất phát. Bật xi-nhan bên phải. Chú ý sau khi đã bật xi-nhan thì giữ thẳng tay lái,
    không đánh lái sang trái sẽ làm tắt đèn xi-nhan, mất điểm. Để cho chắc ăn, bạn có thể dùng ngón
    giữa tay trái giữ cần xi-nhan để không cho cần này bật xuống, hoặc hơi đánh lái sang phải một
    chút.<p/><a href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai11">Bài phụ: Dừng xe nguy hiểm</a></h3>
    <p>Có 3 điểm xuất hiện bài thi phụ bao gồm:</p>
    <ul>
        <li>Qua ngã tư đèn xanh, đèn đỏ vào đoạn đường trước khi rẽ trái vào bài 8.</li>
        <li>Sau khi qua khỏi bài 9 và rẽ trái vào đoạn đường tiếp theo.</li>
        <li>Đoạn đường trước khi đến ngã tư để vào bài 10.</li>
    </ul>
    Khi xe đi qua một số vị trí trên tuyến đường thi (một trong các vị trí trên), loa trong xe có
    thể vang lên "Dừng xe nguy hiểm! Dừng xe nguy hiểm!". Khi nghe hiệu lệnh này, bạn nhanh chóng
    dừng hẳn xe, ấn vào nút đèn báo hiệu nguy hiểm (nút có vẽ hình tam giác). Khi nào loa hết hiệu
    lệnh trên thì nhẩm từ 1 đến 5 sau đó ấn nút lần nữa để tắt đèn và đi tiếp.<p/>Bài thi này chỉ
    xuất hiện một lần ở một trong ba điểm nêu trên.<p/><a href="#tableOfContents">Về đầu trang</a>
    <h3><a name="bai12">Bài phụ: Qua ngã tư có tín hiệu điều khiển giao thông</a></h3>
    <p/>Chấp hành theo tín hiệu điều khiển giao thông: Đèn tín hiệu màu xanh hoặc vàng được phép đi.<br/>Dừng
    xe để khoảng cách từ hình chiếu thanh cản phía trước của xe xuống mặt đường đến vạch dừng
    (khoảng cách A) không quá 500mm.<br/>Bật đèn xi nhan trái qua ngã tư rẽ trái;<br/>Bật đèn xi
    nhan phải khi qua ngã tư rẽ phải;<br/>Lái xe qua ngã tư trong thời gian quy định.<br/>Lái xe qua
    ngã tư không vi phạm vạch kẻ đường.<p/><a href="#tableOfContents">Về đầu trang</a></div>
</body>
</html>`;
export default html;
