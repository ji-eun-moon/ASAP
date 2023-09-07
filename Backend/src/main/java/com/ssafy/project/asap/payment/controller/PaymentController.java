package com.ssafy.project.asap.payment.controller;

import com.ssafy.project.asap.payment.entity.dto.request.CreatePaymentRequest;
import com.ssafy.project.asap.payment.entity.dto.response.PaymentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@Tag(name="Payment", description = "결제 내역 API")
public class PaymentController {

    @GetMapping("/list")
    @Operation(summary = "결제 내역", description = "회원이 결제한 내역을 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "결제 내역 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<PaymentResponse>> getPayments() {

        List<PaymentResponse> paymentResponses = new ArrayList<>();

        paymentResponses.add(new PaymentResponse());
        paymentResponses.add(new PaymentResponse());
        paymentResponses.add(new PaymentResponse());

        return ResponseEntity.status(200).body(paymentResponses);
    }

    @PostMapping("/approve")
    @Operation(summary = "결제", description = "회원의 결제 정보를 통해 결제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "결제 내역 생성", content = @Content(schema = @Schema(
                    implementation = CreatePaymentRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> registerPayment(@RequestBody CreatePaymentRequest createPaymentRequest) {

        return ResponseEntity.status(201).body("결제 내역 생성 완료");
    }
}
