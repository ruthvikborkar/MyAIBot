package com.example.spring_ollama.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/chat")
@CrossOrigin(maxAge = 3600)
public class ChatController {

    private final ChatModel chatModel;

    public ChatController(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping
    public String prompt(@RequestParam(value = "message") String msg) {
        log.info("Requested msg: {}", msg);
        return chatModel.call(msg);

    }

}
