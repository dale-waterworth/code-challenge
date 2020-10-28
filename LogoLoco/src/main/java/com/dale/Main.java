package com.dale;

import java.util.Arrays;

class Main {
    public static void main(String[] args) {

        var logoLoco = new LogoLoco();
        
        Arrays.asList("1.txt", "2.txt", "3.txt", "4.txt", "5.txt")
                .forEach((file) -> {
                    System.out.println(logoLoco.processFile(file));
                });
        /*
            [HAPPY, FISHING, THE, PENGUIN, GROUP]
            [STEVE, BAKERS, LTD, TACKLE, SUPPLIER]
            [HONEST, WHOLESOME, EMPORIUM, JOES, MEAT]
            [BILL, BURIALS, BUDGET, BENS]
            [HOPE, CENTER, EDWARD, ADULTS, HOUSE, AND, STUDYL, FOR]
         */
    }
}