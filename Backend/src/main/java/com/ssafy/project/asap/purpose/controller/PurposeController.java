package com.ssafy.project.asap.purpose.controller;

import com.ssafy.project.asap.api.entity.dto.request.RegisterApiRequest;
import com.ssafy.project.asap.purpose.entity.dto.request.RegisterPurposeRequest;
import com.ssafy.project.asap.purpose.service.PurposeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/purpose")
@RequiredArgsConstructor
public class PurposeController {

    private final PurposeService purposeService;

    @PostMapping("/use")
    @Operation(summary = "API 사용 신청 (사용자)", description = "사용자가 해당 API 사용 신청")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 사용 신청 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody RegisterPurposeRequest request){



        return ResponseEntity.status(200).body(true + " " + request.getPurpose());

    }

    @GetMapping("/check-apply/{api_id}")
    @Operation(summary = "API 사용 상태 확인 (사용자)", description = "사용자가 해당 API 사용 했는지 여부")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 사용 신청 완료", content = @Content(schema =  @Schema(
                    implementation = RegisterApiRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> checkApply(@PathVariable Long api_id){



        return ResponseEntity.status(200).body(true + " " + api_id);

    }

}
